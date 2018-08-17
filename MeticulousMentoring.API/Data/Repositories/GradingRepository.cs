using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using MeticulousMentoring.API.Data.Entities;
using Microsoft.Extensions.Logging;

namespace MeticulousMentoring.API.Data.Repositories
{
    public class GradingRepository : IGradingRepository
    {
        private readonly MeticulousContext _ctx;
        private readonly ILogger<GradingRepository> _logger;

        public GradingRepository(MeticulousContext ctx, ILogger<GradingRepository> logger)
        {
            _ctx = ctx;
            _logger = logger;
        }

        public IEnumerable<GradePeriod> GetAllGradePeriods()
        {
            return _ctx.GradingPeriods.ToList();
        }

        public IEnumerable<Course> GetCoursesBySystem(int system_id, int classification_id)
        {
            return _ctx.Courses
                .Where(c => c.system.id == system_id).GroupBy(x => x.course_name).Select(g => g.First()).ToList();
        }
    }
}