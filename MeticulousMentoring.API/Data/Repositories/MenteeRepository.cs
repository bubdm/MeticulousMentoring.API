using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace MeticulousMentoring.API.Data.Repositories
{
    using MeticulousMentoring.API.Data.Entities;

    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Logging;

    public class MenteeRepository : IMenteeRepository
    {
        private readonly MeticulousContext ctx;

        private readonly ILogger<MenteeRepository> logger;
        private readonly IConfiguration _config;

        public MenteeRepository(MeticulousContext ctx, ILogger<MenteeRepository> logger, IConfiguration config)
        {
            this.ctx = ctx;
            this.logger = logger;
            _config = config;
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

        public IEnumerable<SiteAverage> GetAllAveragesForUser(int classification_id, string school_year)
        {
            try
            {
                var sqlConnection = new SqlConnection(_config.GetConnectionString("MeticulousConnectionString"));
                using (IDbConnection dbConnection = sqlConnection)
                {
                    dbConnection.Open();
                    return dbConnection.Query<SiteAverage>(
                        $"SELECT SUM(gpa)/COUNT(gpa) AS gpa, gpa.period_id, gpa.school_year " +
                        $"FROM dbo.GradePointAverages gpa " +
                        $"WHERE gpa.classification_id = {classification_id} " +
                        $"AND gpa.school_year = '{school_year}' " +
                        "GROUP BY gpa.period_id, gpa.school_year " +
                        "ORDER BY gpa.period_id");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
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
                decimal grade_point = getGradePoint(grade);

                param.Add("@course_id", grade.course_id);
                param.Add("@mentee_id", grade.mentee_id);
                param.Add("@period_id", grade.period_id);
                param.Add("@grade_value", grade.grade_value);
                param.Add("@created_on", currentDate);
                param.Add("@modified_on", currentDate);
                param.Add("@school_year", grade.school_year);
                param.Add("@grade_point", grade_point);

                var sqlConnection = new SqlConnection(_config.GetConnectionString("MeticulousConnectionString"));

                using (IDbConnection dbConnection = sqlConnection)
                {
                    dbConnection.Execute("dbo.AddMenteeGrade", param, commandType: CommandType.StoredProcedure);
                }
            }

            saveGradePointAverage(grades);
        }

        public IEnumerable<GradePointAverage> GetGradePointAverages(int mentee_id)
        {
            return ctx.GradePointAverages.Where(x => x.mentee_id == mentee_id);
        }

        public decimal GetGradePointAverage(int mentee_id, int period_id)
        {
            return ctx.GradePointAverages.Where(x => x.mentee_id == mentee_id && x.period_id == period_id)
                .Select(y => y.gpa).FirstOrDefault();
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

        public void saveGradePointAverage(IEnumerable<GradesDto> grades)
        {
            var menteeId = grades.Select(x => x.mentee_id).FirstOrDefault();
            var periodId = grades.Select(x => x.period_id).FirstOrDefault();
            var schoolYear = grades.Select(x => x.school_year).FirstOrDefault();
            var classificationId = ctx.Mentees.Where(x => x.id == menteeId).Select(y => y.classification.id).FirstOrDefault();
            var gradepointSum = (decimal)0.00;

            var updatedGrades = ctx.Grades.Where(x => x.mentee_id == menteeId && x.period.id == periodId);

            foreach (var grade in updatedGrades)
            {
                gradepointSum += grade.grade_point;
            }

            var gpa = gradepointSum / (decimal)grades.Count();

            ctx.GradePointAverages.Add(new GradePointAverage
            {
                mentee_id = menteeId,
                period_id = periodId,
                school_year = schoolYear,
                gpa = gpa,
                classification_id = classificationId,
                created_on = DateTime.Now,
                modified_on = DateTime.Now,
            });
        }

        public decimal getGradePoint(GradesDto grade)
        {
            var course = ctx.Courses.Find(grade.course_id);
            decimal gradePoint = (decimal)0.00;

            if (grade.grade_value >= 90)
            {
                gradePoint += (decimal)4.00;
                if (course.is_honors)
                {
                    gradePoint += (decimal)0.50;
                }
                else if (course.is_advanced_placement)
                {
                    gradePoint += (decimal)1.00;
                }

                return gradePoint;
            }
            else if (grade.grade_value >= 80 && grade.grade_value <= 89)
            {
                gradePoint += (decimal)3.00;
                if (course.is_honors)
                {
                    gradePoint += (decimal)0.50;
                }
                else if (course.is_advanced_placement)
                {
                    gradePoint += (decimal)1.00;
                }

                return gradePoint;
            }
            else if (grade.grade_value >= 70 && grade.grade_value <= 79)
            {
                gradePoint += (decimal)2.00;
                if (course.is_honors)
                {
                    gradePoint += (decimal)0.50;
                }
                else if (course.is_advanced_placement)
                {
                    gradePoint += (decimal)1.00;
                }

                return gradePoint;
            }
            else if (grade.grade_value >= 60 && grade.grade_value <= 69)
            {
                gradePoint += (decimal)1.00;
                if (course.is_honors)
                {
                    gradePoint += (decimal)0.50;
                }
                else if (course.is_advanced_placement)
                {
                    gradePoint += (decimal)1.00;
                }

                return gradePoint;
            }
            else
            {
                return (decimal)0.00;
            }
        }
    }
}