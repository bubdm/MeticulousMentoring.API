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
    public class ClassificationController : Controller  
    {
        private readonly IClassificationRepository _classificationRepository;
        private readonly ILogger<ClassificationController> _logger;
        private readonly IMapper _mapper;

        public ClassificationController(IClassificationRepository classificationRepository, ILogger<ClassificationController> logger, IMapper mapper)
        {
            _classificationRepository = classificationRepository;
            _logger = logger;
            _mapper = mapper;
        }

        public IActionResult Get()
        {
            try
            {
                return this.Ok(
                    this._mapper.Map<IEnumerable<Classification>, IEnumerable<ClassificationViewModel>>(
                        _classificationRepository.GetAllClassifications()));
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get Classifications: {e}");
                return Json("Bad Request");
            }
        }
    }
}
