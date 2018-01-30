using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MeticulousMentoring.API.Data.Entities;
using Microsoft.Extensions.Logging;

namespace MeticulousMentoring.API.Data.Repositories
{
    public class EducationSystemRepository : IEducationSystemRepository 
    {
        private readonly MeticulousContext _ctx;
        private readonly ILogger<EducationSystemRepository> _logger;

        public EducationSystemRepository(MeticulousContext ctx, ILogger<EducationSystemRepository> logger)
        {
            _ctx = ctx;
            _logger = logger;
        }

        public IEnumerable<EducationSystem> GetAllEducationSystems()
        {
            try
            {
                return this._ctx.Systems
                    .OrderBy(s => s.id)
                    .ToList();
            }
            catch (Exception e)
            {
                this._logger.LogError($"Failed to get systems: {e}");
                return null;
            }
        }

    }

   
}
