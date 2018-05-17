using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MeticulousMentoring.API.Data;
using MeticulousMentoring.API.Data.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MeticulousMentoring.API.Controllers
{
    public class GradingController : Controller
    {
        private readonly IGradingRepository _gradingRepository;
        private readonly ILogger<GradingController> _logger;
        private readonly IMapper _mapper;
        private readonly MeticulousContext _ctx;

        public GradingController(IGradingRepository gradingRepository, ILogger<GradingController> logger, IMapper mapper, MeticulousContext ctx)
        {
            _gradingRepository = gradingRepository;
            _logger = logger;
            _mapper = mapper;
            _ctx = ctx;
        }

        [HttpGet]
        [Route("/api/grading/GetGradingPeriods")]
        public IActionResult GetGradingPeriods()
        {
            try
            {
                return Ok(_gradingRepository.GetAllGradePeriods());
            }
            catch (Exception e)
            {
                this._logger.LogError($"Failed to get periods: {e}");
                return Json("Bad Request");
            }
        }

        [HttpGet]
        [Route("/api/grading/GetCoursesBySystem")]
        public IActionResult GetCoursesBySystem(int system_id, int classification_id)
        {
            try
            {
                return Ok(_gradingRepository.GetCoursesBySystem(system_id, classification_id));
            }
            catch (Exception e)
            {
                this._logger.LogError($"Failed to get courses: {e}");
                return Json("Bad Request");
            }
        }
    }
}