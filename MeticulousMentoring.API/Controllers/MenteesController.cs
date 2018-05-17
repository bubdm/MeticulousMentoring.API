using MeticulousMentoring.API.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
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
    public class MenteesController : Controller
    {
        private readonly IMenteeRepository menteeRepository;
        private readonly ILogger<MenteesController> logger;

        private readonly IMapper mapper;
        private readonly MeticulousContext _ctx;
        private readonly UserManager<MeticulousUser> _userManager;
        private readonly RoleManager<IdentityRole<int>> _roleManager;
        private readonly IMentorRepository _mentorRepository;

        public MenteesController(IMenteeRepository menteeRepository, ILogger<MenteesController> logger, IMapper mapper, MeticulousContext ctx, UserManager<MeticulousUser> userManager, RoleManager<IdentityRole<int>> roleManager, IMentorRepository mentorRepository)
        {
            this.menteeRepository = menteeRepository;
            this.logger = logger;
            this.mapper = mapper;
            _ctx = ctx;
            _userManager = userManager;
            _roleManager = roleManager;
            _mentorRepository = mentorRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return this.Ok(this.mapper.Map<IEnumerable<Mentee>, IEnumerable<MenteeViewModel>>(this.menteeRepository.GetAllMentees()));
            }
            catch (Exception e)
            {
                this.logger.LogError($"Failed to get mentees: {e}");
                return Json("Bad request");
            }
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var mentee = this.menteeRepository.GetMenteeById(id);
                if (mentee != null)
                {
                    return this.Ok(this.mapper.Map<Mentee, MenteeViewModel>(mentee));
                }
                else
                {
                    return this.NotFound();
                }
            }
            catch (Exception e)
            {
                this.logger.LogError($"Failed to get mentee: {e}");
                return Json("Bad request");
            }
        }

        [HttpGet]
        [Route("/api/mentees/GetGuardian/{id}")]
        public IActionResult GetGuardian(int id)
        {
            try
            {
                var guardian = this.menteeRepository.GetGuardianByMenteeId(id);
                if (guardian != null)
                {
                    return this.Ok(this.mapper.Map<Guardian, GuardianViewModel>(guardian));
                }
                else
                {
                    return this.NotFound();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet]
        [Route("/api/mentees/GetMentor/{id}")]
        public IActionResult GetMentor(int id)
        {
            try
            {
                var mentor = this.menteeRepository.GetMentorByMenteeId(id);
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
                Console.WriteLine(e);
                throw;
            }
        }

        //[EnableCors("Meticulous")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]MenteeViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var mentee = await _userManager.FindByEmailAsync(model.MenteeEmail);
                    if (mentee == null)
                    {
                        mentee = new MeticulousUser()
                        {
                            UserName = model.MenteeEmail,
                            Email = model.MenteeEmail
                        };

                        var menteeResult =
                            await _userManager.CreateAsync(mentee, model.MenteeLastName + DateTime.Now.Year + "!");

                        if (menteeResult == IdentityResult.Success)
                        {
                            await _userManager.AddToRoleAsync(mentee, "Mentee");
                            model.MenteeId = mentee.Id;

                            var newMentee = this.mapper.Map<MenteeViewModel, Mentee>(model);

                            _ctx.Addresses.Add(model.MenteeAddress);
                            await _ctx.SaveChangesAsync();
                            var mClassification = _ctx.Classifications.Single(x =>
                                x.classification_id == model.MenteeClassification.classification_id);
                            newMentee.classification = mClassification;
                            var mSchool = _ctx.Schools.Single(s => s.id == model.MenteeSchool.id);
                            newMentee.school = mSchool;
                            newMentee.created_on = DateTime.Now;
                            newMentee.modified_on = DateTime.Now;
                            this.menteeRepository.AddMentee(newMentee);
                            if (this.menteeRepository.SaveAll())
                            {
                                _ctx.TimeLine.Add(new Timeline
                                {
                                    user_id = model.MenteeId,
                                    detail = "Started Program",
                                    timeline_date = DateTime.Now
                                });
                                _ctx.SaveChanges();

                                return Created($"/api/mentees/{newMentee.id}", this.mapper.Map<Mentee, MenteeViewModel>(newMentee));
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
                this.logger.LogError($"Could not save Mentee data {e}");
            }

            return this.BadRequest("Failed to save new Mentee data");
        }

        [HttpPost]
        [Route("/api/mentees/AddGuardian")]
        public async Task<IActionResult> AddGuardian([FromBody]GuardianViewModel guardian)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newGuardian = this.mapper.Map<GuardianViewModel, Guardian>(guardian);
                    var existingAddress =
                        await _ctx.Addresses.FirstOrDefaultAsync(x => x.address1 == newGuardian.address.address1);

                    if (existingAddress == null)
                    {
                        _ctx.Addresses.Add(guardian.GuardianAddress);
                    }
                    else
                    {
                        newGuardian.address = existingAddress;
                    }

                    var child = _ctx.Mentees.FirstOrDefault(x => x.id == newGuardian.children.ElementAtOrDefault(0).id);
                    newGuardian.children.Clear();
                    newGuardian.children.Add(child);
                    newGuardian.created_on = DateTime.Now;
                    newGuardian.modified_on = DateTime.Now;
                    _ctx.Guardians.Add(newGuardian);

                    await _ctx.SaveChangesAsync();

                    return Created($"/api/guardians/{newGuardian.id}",
                        this.mapper.Map<Guardian, GuardianViewModel>(newGuardian));
                }
                else
                {
                    return this.BadRequest(ModelState);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpPost]
        [Route("/api/mentees/AddGrades")]
        public async Task<IActionResult> AddGrades([FromBody]IEnumerable<GradesDto> grades)
        {
            try
            {
                menteeRepository.SaveMenteeGrades(grades);
                return Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet]
        [Route("/api/mentees/TotalMentees")]
        public async Task<IActionResult> GetTotalMentees()
        {
            try
            {
                return this.Ok(this.mapper.Map<IEnumerable<Mentee>, IEnumerable<MenteeViewModel>>(this.menteeRepository.GetTotalMentees()));
            }
            catch (Exception e)
            {
                this.logger.LogError($"Failed to get mentees: {e}");
                return Json("Bad request");
            }
        }

        [HttpGet]
        [Route("/api/mentees/MenteeGrades/{id}")]
        public async Task<IActionResult> MenteeGrades(int id)
        {
            try
            {
                var grades = this.menteeRepository.GetMenteeGrades(id);
                if (grades != null)
                {
                    return this.Ok(this.mapper.Map<IEnumerable<Grade>, IEnumerable<GradeViewModel>>(grades));
                }
                else
                {
                    return this.NotFound();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}