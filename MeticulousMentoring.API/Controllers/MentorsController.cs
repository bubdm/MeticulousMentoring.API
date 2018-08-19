using MeticulousMentoring.API.Data;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeticulousMentoring.API.Controllers
{
    using AutoMapper;

    using MeticulousMentoring.API.Data.Entities;
    using MeticulousMentoring.API.Data.Repositories;
    using MeticulousMentoring.API.ViewModels;

    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    [Route("api/[Controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class MentorsController : Controller
    {
        private readonly IMentorRepository mentorRepository;

        private readonly ILogger<MentorsController> logger;

        private readonly IMapper mapper;
        private readonly MeticulousContext _ctx;
        private readonly UserManager<MeticulousUser> _userManager;
        private readonly RoleManager<IdentityRole<int>> _roleManager;

        public MentorsController(IMentorRepository mentorRepository, ILogger<MentorsController> logger, IMapper mapper, MeticulousContext ctx, UserManager<MeticulousUser> userManager, RoleManager<IdentityRole<int>> _roleManager)
        {
            this.mentorRepository = mentorRepository;
            this.logger = logger;
            this.mapper = mapper;
            _ctx = ctx;
            _userManager = userManager;
            this._roleManager = _roleManager;
        }

        [HttpGet]
        public IActionResult Get(bool includeMentees = true)
        {
            try
            {
                var results = this.mentorRepository.GetAllMentors(includeMentees);

                return this.Ok(this.mapper.Map<IEnumerable<Mentor>, IEnumerable<MentorViewModel>>(results));
            }
            catch (Exception e)
            {
                this.logger.LogError($"Failed to get all mentors{e}");
                return Json("Bad Request");
            }
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var mentor = this.mentorRepository.GetMentorById(id);

                if (mentor != null)
                {
                    return this.Ok(this.mapper.Map<Mentor, MentorViewModel>(mentor));
                }
                else
                {
                    return this.NotFound();
                }
            }
            catch (Exception e)
            {
                this.logger.LogError($"Failed to get mentor: {e}");
                return Json("Bad Request");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MentorViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var mentorEmail =
                        $"{model.MentorFirstName.ToLower()}.{model.MentorLastName.ToLower()}@meticulousmentoring.com";
                    var mentor = await this._userManager.FindByEmailAsync(mentorEmail);
                    if (mentor == null)
                    {
                        mentor = new MeticulousUser()
                        {
                            UserName = mentorEmail,
                            Email = mentorEmail,
                            FirstName = model.MentorFirstName,
                            LastName = model.MentorLastName
                        };

                        var mentorResult =
                            await _userManager.CreateAsync(mentor, $"{model.MentorLastName}{DateTime.Now.Year}!");

                        if (mentorResult == IdentityResult.Success)
                        {
                            await _userManager.AddToRoleAsync(mentor, "Mentor");
                            model.MentorId = mentor.Id;
                            var newMentor = this.mapper.Map<MentorViewModel, Mentor>(model);

                            _ctx.TimeLine.Add(new Timeline
                            {
                                user_id = model.MentorId,
                                detail = "Joined Program",
                                timeline_date = DateTime.Now
                            });

                            _ctx.Addresses.Add(model.MentorAddress);
                            await _ctx.SaveChangesAsync();
                            newMentor.mentees.Clear();

                            var mentee_names =
                                model.MentorMentees.Select(x => x.MenteeFirstName + ' ' + x.MenteeLastName);

                            var menteeStrings = string.Join(',', mentee_names);

                            foreach (var mentee in model.MentorMentees)
                            {
                                var menteeToAdd = _ctx.Mentees.Single(x => x.id == mentee.MenteeId);
                                menteeToAdd.modified_on = DateTime.Now;
                                newMentor.mentees.Add(menteeToAdd);

                                _ctx.TimeLine.Add(new Timeline
                                {
                                    user_id = mentee.MenteeId,
                                    detail = $"Matched with {model.MentorFirstName} {model.MentorLastName}",
                                    timeline_date = DateTime.Now
                                });
                            }

                            _ctx.TimeLine.Add(new Timeline
                            {
                                user_id = model.MentorId,
                                detail = $"Matched with mentee(s) {menteeStrings}",
                                timeline_date = DateTime.Now
                            });

                            newMentor.created_on = DateTime.Now;
                            newMentor.modified_on = DateTime.Now;
                            this.mentorRepository.AddMentor(newMentor);
                            if (this.mentorRepository.SaveAll())
                            {
                                return Created(
                                    $"/api/mentors/{newMentor.id}",
                                    this.mapper.Map<Mentor, MentorViewModel>(newMentor));
                            }
                        }
                    }
                }
                else
                {
                    return this.BadRequest(ModelState);
                }
            }
            catch (Exception e)
            {
                this.logger.LogError($"Could not save Mentor data: {e}");
            }
            return this.BadRequest("Failed to save new Mentor data");
        }
    }
}