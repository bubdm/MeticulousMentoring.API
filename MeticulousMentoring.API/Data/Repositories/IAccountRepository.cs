using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MeticulousMentoring.API.ViewModels;

namespace MeticulousMentoring.API.Data.Repositories
{
    public interface IAccountRepository
    {
        IEnumerable<UserViewModel> GetUsersWithRoles();

        Task<bool> deleteUser(int id);
    }
}