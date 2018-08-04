using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using MeticulousMentoring.API.ViewModels;
using Dapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace MeticulousMentoring.API.Data.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IConfiguration _config;
        private readonly ILogger<AccountRepository> _logger;

        public AccountRepository(IConfiguration config, ILogger<AccountRepository> logger)
        {
            _config = config;
            _logger = logger;
        }

        public IEnumerable<UserViewModel> GetUsersWithRoles()
        {
            var cs = _config.GetSection("ConnectionStrings").GetSection("MeticulousConnectionString").Value;

            try
            {
                using (IDbConnection dbConnection = new SqlConnection(cs))
                {
                    dbConnection.Open();
                    var results = dbConnection.Query<UserViewModel>(
                        "Select Distinct u.Id as \'id\', u.FirstName as \'firstName\', u.LastName as \'lastName\',\r\nu.UserName as \'userName\', u.Email as \'email\', r.name as \'role\' from dbo.Users u \r\ninner join dbo.UserRoles ur \r\non u.Id = ur.UserId\r\ninner join dbo.Roles r\r\non ur.RoleId = r.Id\r\n"
                        );

                    return results;
                }
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get users: {e}");
                return null;
            }
        }
    }
}