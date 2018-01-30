using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MeticulousMentoring.API.Data.Entities;
using MeticulousMentoring.API.Data.Repositories;
using MeticulousMentoring.API.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MeticulousMentoring.API.Controllers
{
    [Route("api/[Controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class SchoolsController : Controller
    {
        private readonly ISchoolRepository _schoolRepository;
        private readonly ILogger<SchoolsController> _logger;
        private readonly IMapper _mapper;

        public SchoolsController(ISchoolRepository schoolRepository, ILogger<SchoolsController> logger, IMapper mapper)
        {
            _schoolRepository = schoolRepository;
            _logger = logger;
            _mapper = mapper;
        }

        public IActionResult Get()
        {
            try
            {
                return this.Ok(
                    _mapper.Map<IEnumerable<School>, IEnumerable<SchoolViewModel>>(
                        _schoolRepository.GetAllSchools()));
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get Schools: {e}");
                return Json("Bad Request");
            }
        }
    }
}
