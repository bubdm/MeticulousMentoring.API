using AutoMapper;
using MeticulousMentoring.API.Data.Entities;
using MeticulousMentoring.API.Data.Repositories;
using MeticulousMentoring.API.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace MeticulousMentoring.API.Controllers
{
    [Route("api/[Controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class EducationSystemController : Controller
    {
        private readonly IEducationSystemRepository _educationSystemRepository;
        private readonly ILogger<EducationSystemController> _logger;
        private readonly IMapper _mapper;

        public EducationSystemController(IEducationSystemRepository educationSystemRepository, ILogger<EducationSystemController> logger, IMapper mapper)
        {
            _educationSystemRepository = educationSystemRepository;
            _logger = logger;
            _mapper = mapper;
        }

        public IActionResult Get()
        {
            try
            {
                return this.Ok(
                    _mapper.Map<IEnumerable<EducationSystem>, IEnumerable<EducationSystemViewModel>>(
                        _educationSystemRepository.GetAllEducationSystems()));
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get systems: {e}");
                return Json("Bad Request");
            }
        }
    }
}