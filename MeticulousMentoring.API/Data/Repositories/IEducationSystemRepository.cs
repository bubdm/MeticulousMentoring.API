using MeticulousMentoring.API.Data.Entities;
using System.Collections.Generic;

namespace MeticulousMentoring.API.Data.Repositories
{
    public interface IEducationSystemRepository
    {
        IEnumerable<EducationSystem> GetAllEducationSystems();
    }
}