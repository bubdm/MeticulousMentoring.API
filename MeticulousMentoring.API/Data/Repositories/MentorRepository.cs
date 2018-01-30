using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeticulousMentoring.API.Data.Repositories
{
    using MeticulousMentoring.API.Data.Entities;

    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Logging;

    public class MentorRepository : IMentorRepository
    {
        private readonly MeticulousContext ctx;

        private readonly ILogger<MentorRepository> logger;

        public MentorRepository(MeticulousContext ctx, ILogger<MentorRepository> logger)
        {
            this.ctx = ctx;
            this.logger = logger;
        }

        public IEnumerable<Mentor> GetAllMentors(bool includeMentees)
        {
            try
            {
                if (includeMentees)
                {
                    return this.ctx.Mentors
                        .Include(m => m.mentees)
                        .Include("mentees.address")
                        .Include("mentees.school")
                        .Include("mentees.school.system")
                        .Include("mentees.classification")
                        .Include(m => m.address)
                        .OrderBy(m => m.last_name)
                        .ToList();
                }
                else
                {
                    return this.ctx.Mentors
                        .Include(m => m.address)
                        .OrderBy(m => m.last_name)
                        .ToList();
                }
                
            }
            catch (Exception e)
            {
               this.logger.LogError($"Failed to get all mentors: {e}");
                return null;
            }
        }

        public Mentor GetMentorById(int id)
        {
            try
            {
                return this.ctx.Mentors
                    .Include(m => m.mentees)
                    .Include("mentees.address")
                    .Include("mentees.school")
                    .Include("mentees.school.system")
                    .Include("mentees.classification")
                    .Include(m => m.address)
                    .FirstOrDefault(m => m.id == id);
            }
            catch (Exception e)
            {
                this.logger.LogError($"Failed to get all mentor: {e}");
                return null;
            }
        }

        public bool SaveAll()
        {
            return this.ctx.SaveChanges() > 0;
        }

        public void AddMentor(object model)
        {
            this.ctx.Add(model);
        }
    }
}
