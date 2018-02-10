using Microsoft.Extensions.Logging;

namespace MeticulousMentoring.API.Data.Repositories
{
    public class DirectorRepository : IDirectorRepository
    {
        private readonly MeticulousContext _ctx;
        private readonly ILogger<DirectorRepository> _logger;

        public DirectorRepository(MeticulousContext ctx, ILogger<DirectorRepository> logger)
        {
            _ctx = ctx;
            _logger = logger;
        }

        public void AddDirector(object model)
        {
            this._ctx.Add(model);
        }

        public bool SaveAll()
        {
            return this._ctx.SaveChanges() > 0;
        }
    }
}