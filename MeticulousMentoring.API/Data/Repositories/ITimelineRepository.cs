using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MeticulousMentoring.API.Data.Entities;

namespace MeticulousMentoring.API.Data.Repositories
{
    public interface ITimelineRepository
    {
        IEnumerable<Timeline> GetTimeLineDataForUser(int user_id);
    }
}