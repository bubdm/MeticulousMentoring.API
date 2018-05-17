using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MeticulousMentoring.API.Data;
using MeticulousMentoring.API.Data.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MeticulousMentoring.API.Controllers
{
    [Route("api/[Controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class TimelineController : Controller
    {
        private readonly ITimelineRepository _timelineRepository;
        private readonly ILogger<TimelineController> _logger;
        private readonly MeticulousContext _ctx;

        public TimelineController(ITimelineRepository timelineRepository, ILogger<TimelineController> logger, MeticulousContext ctx)
        {
            _timelineRepository = timelineRepository;
            _logger = logger;
            _ctx = ctx;
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                return this.Ok(_timelineRepository.GetTimeLineDataForUser(id));
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get Timeline:{e}");
                return Json("Bad Request");
            }
        }
    }
}