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

    public class MenteeRepository : IMenteeRepository
    {
        private readonly MeticulousContext ctx;

        private readonly ILogger<MenteeRepository> logger;

        public MenteeRepository(MeticulousContext ctx, ILogger<MenteeRepository> logger)
        {
            this.ctx = ctx;
            this.logger = logger;
        }

        public IEnumerable<Mentee> GetAllMentees()
        {
            try
            {
                var mentees = new List<Mentee>();

                var mentors = this.ctx.Mentors
                    .Include(m => m.mentees)
                    .Include("mentees.address")
                    .Include("mentees.school")
                    .Include("mentees.school.system")
                    .Include("mentees.classification")
                    .ToList();

                foreach (var mentor in mentors)
                {
                    mentees.AddRange(mentor.mentees);
                }

                return this.ctx.Mentees
                    .Where(m => !mentees.Select(b => b.id).Contains(m.id))
                    .Include(m => m.school)
                    .Include("school.address")
                    .Include("school.system")
                    .Include(m => m.classification)
                    .Include(m => m.address)
                    .OrderBy(m => m.last_name)
                    .ToList();
            }
            catch (Exception e)
            {
                this.logger.LogError($"Failed to get all mentees: {e}");
                return null;
            }
            
        }

        public IEnumerable<Mentee> GetTotalMentees()
        {
            try
            {
                return this.ctx.Mentees
                    .Include(m => m.school)
                    .Include("school.address")
                    .Include("school.system")
                    .Include(m => m.classification)
                    .Include(m => m.address)
                    .OrderBy(m => m.last_name)
                    .ToList();
            }
            catch (Exception e)
            {
                this.logger.LogError($"Failed to get all mentees: {e}");
                return null;
            }
        }

        public Mentee GetMenteeById(int id)
        {
            try
            {
                return this.ctx.Mentees
                    .Include(m => m.school)
                    .Include("school.address")
                    .Include("school.system")
                    .Include(m => m.classification)
                    .Include(m => m.address)
                    .FirstOrDefault(m => m.id == id);
            }
            catch (Exception e)
            {
                this.logger.LogError($"Failed to get all mentee: {e}");
                return null;
            }
        }

        public Mentor GetMentorByMenteeId(int id)
        {
            try
            {
                return this.ctx.Mentors
                    .Include(m => m.address)
                    .FirstOrDefault(m => m.mentees.Select(x => x.id).Contains(id));
            }
            catch (Exception e)
            {
                this.logger.LogError($"Failed to get Mentor: {e}");
                return null;
            }
           


        }

        public Guardian GetGuardianByMenteeId(int id)
        {
            try
            {
                return this.ctx.Guardians
                    .Include(g => g.address)
                    .FirstOrDefault(g => g.children.Select(x => x.id).Contains(id));
            }
            catch (Exception e)
            {
                this.logger.LogError($"Failed to get Guardian: {e}");
                return null;
            }
        }


        public bool SaveAll()
        {
            return this.ctx.SaveChanges() > 0;
        }

        public void AddMentee(object model)
        {
            this.ctx.Add(model);
        }
    }
}
