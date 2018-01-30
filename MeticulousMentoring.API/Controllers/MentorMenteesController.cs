using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

    [Route("/api/mentors/{mentorid}/mentees")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class MentorMenteesController : Controller
    {
        private readonly IMenteeRepository menteeRepository;

        private readonly IMentorRepository mentorRepository;

        private readonly ILogger<MentorMenteesController> logger;

        private readonly IMapper mapper;

        public MentorMenteesController(IMenteeRepository menteeRepository, IMentorRepository mentorRepository, ILogger<MentorMenteesController> logger, IMapper mapper)
        {
            this.menteeRepository = menteeRepository;
            this.mentorRepository = mentorRepository;
            this.logger = logger;
            this.mapper = mapper;
        }

        [HttpGet]
        public IActionResult Get(int mentorId)
        {
            var mentor = this.mentorRepository.GetMentorById(mentorId);
            if (mentor != null)
            {
                return this.Ok(this.mapper.Map<IEnumerable<Mentee>, IEnumerable<MenteeViewModel>>(mentor.mentees));
            }

            return this.NotFound();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int mentorId, int id)
        {
            var mentor = this.mentorRepository.GetMentorById(mentorId);
            if (mentor != null)
            {
                var mentee = mentor.mentees.FirstOrDefault(m => m.id == id);
                if (mentee != null)
                {
                    return this.Ok(this.mapper.Map<Mentee, MenteeViewModel>(mentee));
                }
                
            }

            return this.NotFound();
        }
    }
}
