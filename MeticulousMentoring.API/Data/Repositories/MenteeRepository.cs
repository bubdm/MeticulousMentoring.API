using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;

namespace MeticulousMentoring.API.Data.Repositories
{
    using MeticulousMentoring.API.Data.Entities;

    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Logging;

    public class MenteeRepository : IMenteeRepository
    {
        private readonly MeticulousContext ctx;
        private readonly string _connectionString;
        private readonly ILogger<MenteeRepository> logger;
        private IDbConnection _connection { get { return new SqlConnection(_connectionString); } }

        public MenteeRepository(MeticulousContext ctx, ILogger<MenteeRepository> logger)
        {
            this.ctx = ctx;
            this.logger = logger;
            _connectionString =
                "server=DESKTOP-CV71GOA;Initial Catalog=Meticulous;Integrated Security=True;MultipleActiveResultSets=true;";
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

        public void SaveMenteeGrades(IEnumerable<GradesDto> grades)
        {
            DynamicParameters param = new DynamicParameters();
            DateTime currentDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);

            foreach (var grade in grades)
            {
                param.Add("@course_id", grade.course_id);
                param.Add("@mentee_id", grade.mentee_id);
                param.Add("@period_id", grade.period_id);
                param.Add("@grade_value", grade.grade_value);
                param.Add("@created_on", currentDate);
                param.Add("@modified_on", currentDate);
                param.Add("@school_year", grade.school_year);

                using (IDbConnection dbConnection = _connection)
                {
                    dbConnection.Execute("dbo.AddMenteeGrade", param, commandType: CommandType.StoredProcedure);
                }
            }
        }

        public IEnumerable<Grade> GetMenteeGrades(int id)
        {
            try
            {
                return this.ctx.Grades
                    .Include(g => g.grade_course)
                    .Include(g => g.period)
                    .Where(g => g.mentee_id == id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}