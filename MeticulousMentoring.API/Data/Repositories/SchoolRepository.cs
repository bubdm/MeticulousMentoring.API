using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MeticulousMentoring.API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace MeticulousMentoring.API.Data.Repositories
{
    public class SchoolRepository : ISchoolRepository
    {
        private readonly MeticulousContext _ctx;
        private readonly ILogger<SchoolRepository> _logger;

        public SchoolRepository(MeticulousContext ctx, ILogger<SchoolRepository> logger)
        {
            _ctx = ctx;
            _logger = logger;
        }
        public IEnumerable<School> GetAllSchools()
        {
            try
            {
                return this._ctx.Schools
                        .Include(s => s.address)
                    .Include(s => s.system)
                    .OrderBy(s => s.school_name)
                    .ToList();
            }
            catch (Exception e)
            {
                this._logger.LogError($"Failed to get schools: {e}");
                return null;
            }
        }
    }
}
