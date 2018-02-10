using MeticulousMentoring.API.Data.Entities;
using System.Collections.Generic;

namespace MeticulousMentoring.API.Data.Repositories
{
    public interface ISchoolRepository
    {
        IEnumerable<School> GetAllSchools();
    }
}