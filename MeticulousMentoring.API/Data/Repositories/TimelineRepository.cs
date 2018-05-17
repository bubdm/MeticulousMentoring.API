using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MeticulousMentoring.API.Data.Entities;
using Microsoft.Extensions.Logging;

namespace MeticulousMentoring.API.Data.Repositories
{
    public class TimelineRepository : ITimelineRepository
    {
        private readonly MeticulousContext _ctx;
        private readonly ILogger<TimelineRepository> _logger;

        public TimelineRepository(MeticulousContext ctx, ILogger<TimelineRepository> logger)
        {
            _ctx = ctx;
            _logger = logger;
        }

        public IEnumerable<Timeline> GetTimeLineDataForUser(int user_id)
        {
            try
            {
                return _ctx.TimeLine.Where(x => x.user_id == user_id)
                    .OrderBy(d => d.timeline_date);
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get timeline data:{e}");
                return null;
            }
        }
    }
}