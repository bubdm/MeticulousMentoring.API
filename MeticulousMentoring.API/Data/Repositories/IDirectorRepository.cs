using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeticulousMentoring.API.Data.Repositories
{
    public interface IDirectorRepository
    {
        void AddDirector(object model);
        bool SaveAll();
    }
}
