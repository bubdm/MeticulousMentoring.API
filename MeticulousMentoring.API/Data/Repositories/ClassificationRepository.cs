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
    public class ClassificationRepository : IClassificationRepository
    {
        private readonly MeticulousContext ctx;
        private readonly ILogger<ClassificationRepository> logger;

        public ClassificationRepository(MeticulousContext ctx, ILogger<ClassificationRepository> logger)
        {
            this.ctx = ctx;
            this.logger = logger;
        }


        public IEnumerable<Classification> GetAllClassifications()
        {
            try
            {
                return this.ctx.Classifications
                    .OrderBy(c => c.classification_id)
                    .ToList();

            }
            catch (Exception e)
            {
                this.logger.LogError($"Failed to get classifications: {e}");
                return null;
            }
        }
    }
}
