using AutoMapper;
using MeticulousMentoring.API.Data.Entities;
using MeticulousMentoring.API.Data.Repositories;
using MeticulousMentoring.API.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace MeticulousMentoring.API.Controllers
{
    [Route("api/[Controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class DirectorsController : Controller
    {
        private readonly IDirectorRepository _directorRepository;
        private readonly ILogger<DirectorsController> _logger;
        private readonly IMapper _mapper;
        private readonly UserManager<MeticulousUser> _userManager;
        private readonly RoleManager<IdentityRole<int>> _roleManager;

        public DirectorsController(IDirectorRepository directorRepository, ILogger<DirectorsController> logger, IMapper mapper, UserManager<MeticulousUser> userManager, RoleManager<IdentityRole<int>> roleManager)
        {
            _directorRepository = directorRepository;
            _logger = logger;
            _mapper = mapper;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DirectorViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var director = await _userManager.FindByEmailAsync(model.DirectorEmail);
                    if (director == null)
                    {
                        director = new MeticulousUser()
                        {
                            UserName = model.DirectorEmail,
                            Email = model.DirectorEmail
                        };

                        var directorResult = await _userManager.CreateAsync(director,
                            $"{model.DirectorLastName}{DateTime.Now.Year}!");

                        if (directorResult == IdentityResult.Success)
                        {
                            await _userManager.AddToRoleAsync(director, "Director");
                            model.DirectorId = director.Id;
                            var newDirector = this._mapper.Map<DirectorViewModel, Director>(model);
                            newDirector.created_on = DateTime.Now;
                            newDirector.modified_on = DateTime.Now;

                            _directorRepository.AddDirector(newDirector);
                            if (_directorRepository.SaveAll())
                            {
                                return Created($"/api/directors/{newDirector.id}",
                                    _mapper.Map<Director, DirectorViewModel>(newDirector));
                            }
                        }
                    }
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception e)
            {
                this._logger.LogError($"Could not save Director data: {e}");
            }

            return BadRequest("Failed to save Director data");
        }
    }
}