using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using MeticulousMentoring.API.ViewModels;
using Dapper;
using MeticulousMentoring.API.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;

namespace MeticulousMentoring.API.Data.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IConfiguration _config;
        private readonly ILogger<AccountRepository> _logger;
        private readonly MeticulousContext _ctx;
        private readonly UserManager<MeticulousUser> _userManager;

        public AccountRepository(IConfiguration config, ILogger<AccountRepository> logger, MeticulousContext ctx, UserManager<MeticulousUser> userManager)
        {
            _config = config;
            _logger = logger;
            _ctx = ctx;
            _userManager = userManager;
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

        public async Task<bool> deleteUser(int id)
        {
            var mentee = _ctx.Mentees.Find(id);
            var mentor = _ctx.Mentors.Find(id);
            var director = _ctx.Directors.Find(id);
            var user = await _userManager.FindByIdAsync(id.ToString());
            var role = await _userManager.GetRolesAsync(user);

            switch (role.First())
            {
                case "Admin":
                    return true;
                    break;

                case "Director":
                    _ctx.Directors.Remove(director);
                    return true;
                    break;

                case "Mentor":
                    var mentorAddress = _ctx.Addresses.FirstOrDefault(x => x.id == mentor.addressid);
                    if (mentorAddress != null)
                    {
                        _ctx.Remove(mentorAddress);
                    }

                    var mentorMentees = _ctx.Mentees.Where(x => x.Mentorid == id).ToList();

                    foreach (var mentorMentee in mentorMentees)
                    {
                        mentorMentee.Mentorid = null;
                    }

                    _ctx.Mentors.Remove(mentor);
                    return true;
                    break;

                case "Mentee":
                    var menteeAddress = _ctx.Addresses.FirstOrDefault(x => x.id == mentee.addressid);
                    var guardianId = mentee.Guardianid;
                    var mentorId = mentee.Mentorid;

                    if (menteeAddress != null)
                    {
                        _ctx.Addresses.Remove(menteeAddress);
                    }

                    var menteeGuardian = _ctx.Guardians.Find(guardianId);
                    if (menteeGuardian != null)
                    {
                        _ctx.Guardians.Remove(menteeGuardian);
                    }

                    var menteeGrades = _ctx.Grades.Where(x => x.mentee_id == mentee.id).ToList();

                    _ctx.Grades.RemoveRange(menteeGrades);

                    var menteeMentor = _ctx.Mentors.Find(mentorId);
                    if (menteeMentor != null)
                    {
                        _ctx.Mentors.Remove(menteeMentor);
                    }

                    _ctx.Mentees.Remove(mentee);
                    return true;
                    break;

                default:
                    return false;
                    break;
            }
        }
    }
}