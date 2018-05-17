using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MeticulousMentoring.API.Data.Entities;

namespace MeticulousMentoring.API.Data.Repositories
{
    public interface IGradingRepository
    {
        IEnumerable<GradePeriod> GetAllGradePeriods();

        IEnumerable<Course> GetCoursesBySystem(int system_id, int classification_id);
    }
}