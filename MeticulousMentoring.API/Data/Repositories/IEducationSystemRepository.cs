using System.Collections.Generic;
using MeticulousMentoring.API.Data.Entities;

namespace MeticulousMentoring.API.Data.Repositories
{
    public interface IEducationSystemRepository
    {
        IEnumerable<EducationSystem> GetAllEducationSystems();
    }
}