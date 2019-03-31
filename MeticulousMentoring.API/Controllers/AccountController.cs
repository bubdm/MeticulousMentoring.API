using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MeticulousMentoring.API.Data;
using MeticulousMentoring.API.Data.Repositories;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Net.Http.Headers;
using ContentDispositionHeaderValue = System.Net.Http.Headers.ContentDispositionHeaderValue;

namespace MeticulousMentoring.API.Controllers
{
    using MeticulousMentoring.API.Data.Entities;
    using MeticulousMentoring.API.ViewModels;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Logging;
    using Microsoft.IdentityModel.Tokens;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;

    [EnableCors("Meticulous")]
    public class AccountController : Controller
    {
        private readonly ILogger<AccountController> logger;

        private readonly SignInManager<MeticulousUser> signInManager;

        private readonly UserManager<MeticulousUser> userManager;

        private readonly IConfiguration config;

        private readonly RoleManager<IdentityRole<int>> roleManager;
        private readonly IAccountRepository _accountRepository;
        private readonly MeticulousContext _ctx;
        private readonly IHostingEnvironment hostingEnvironment;

        public AccountController(ILogger<AccountController> logger, SignInManager<MeticulousUser> signInManager, UserManager<MeticulousUser> userManager,
            IConfiguration config, RoleManager<IdentityRole<int>> roleManager, IAccountRepository accountRepository, MeticulousContext ctx, IHostingEnvironment hostingEnvironment)
        {
            this.logger = logger;
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.config = config;
            this.roleManager = roleManager;
            _accountRepository = accountRepository;
            _ctx = ctx;
            this.hostingEnvironment = hostingEnvironment;
        }

        public IActionResult Login()
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Values");
            }

            return this.View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await this.signInManager.PasswordSignInAsync(
                    model.Username,
                    model.Password,
                    model.RememeberMe,
                    false);

                if (result.Succeeded)
                {
                    if (Request.Query.Keys.Contains("ReturnUrl"))
                    {
                        Redirect(Request.Query["ReturnUrl"].First());
                    }
                    else
                    {
                        RedirectToAction("Index", "Values");
                    }
                }
            }

            ModelState.AddModelError("", "Failed to login");

            return this.View();
        }

        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await this.signInManager.SignOutAsync();
            return RedirectToAction("Index", "Values");
        }

        [HttpPost]
        public async Task<IActionResult> CreateToken([FromBody] LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await this.userManager.FindByNameAsync(model.Username);

                if (user != null)
                {
                    var result = await this.signInManager.CheckPasswordSignInAsync(user, model.Password, false);

                    if (result.Succeeded)
                    {
                        //// Create token
                        var claims = new List<Claim>(new[]
                                         {
                                             new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                                             new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                                             new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
                                             new Claim(JwtRegisteredClaimNames.Iat, user.Id.ToString()),
                                             new Claim(JwtRegisteredClaimNames.GivenName, user.FirstName),
                                             new Claim(JwtRegisteredClaimNames.FamilyName, user.LastName)
                                         });

                        claims.AddRange(await this.userManager.GetClaimsAsync(user));

                        var roleNames = await this.userManager.GetRolesAsync(user);

                        foreach (var roleName in roleNames)
                        {
                            var role = await this.roleManager.FindByNameAsync(roleName);
                            if (role != null)
                            {
                                var roleClaim = new Claim("role", role.Name, ClaimValueTypes.String);
                                claims.Add(roleClaim);

                                var roleClaims = await this.roleManager.GetClaimsAsync(role);
                                claims.AddRange(roleClaims);
                            }
                        }

                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.config["Tokens:Key"]));
                        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                        var token = new JwtSecurityToken(this.config["Tokens:Issuer"],
                            this.config["Tokens:Audience"],
                            claims,
                            expires: DateTime.UtcNow.AddMinutes(20),
                            signingCredentials: creds);

                        var results = new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(token),
                            expiration = token.ValidTo
                        };

                        return Created("", results);
                    }
                }
            }

            return this.BadRequest();
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<List<MeticulousUser>> GetUsers()
        {
            using (userManager)
            {
                return await userManager.Users.ToListAsync();
            }
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("/api/account/GetUserWithRoles")]
        public async Task<IActionResult> GetUserWithRoles()
        {
            try
            {
                return Ok(_accountRepository.GetUsersWithRoles());
            }
            catch (Exception e)
            {
                logger.LogError($"Failed to get users with roles: {e}");
                return null;
            }
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("/api/account/AddAdmin")]
        public async Task<IActionResult> AddAdmin([FromBody] AdminViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var admin = await userManager.FindByEmailAsync(model.AdminEmail);
                    if (admin == null)
                    {
                        admin = new MeticulousUser()
                        {
                            UserName = model.AdminEmail,
                            Email = model.AdminEmail,
                            FirstName = model.AdminFirstName,
                            LastName = model.AdminLastName
                        };

                        var adminResult = await userManager.CreateAsync(admin,
                            $"{model.AdminLastName}{DateTime.Now.Year}!");

                        if (adminResult == IdentityResult.Success)
                        {
                            await userManager.AddToRoleAsync(admin, "Admin");
                            return Ok();
                        }
                    }
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception e)
            {
                this.logger.LogError($"Could not save Admin: {e}");
            }

            return BadRequest("Failed to save Admin");
        }

        [HttpDelete]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("/api/account/DeleteUser/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (await _accountRepository.deleteUser(id))
            {
                var timelineEntries = _ctx.TimeLine.Where(x => x.user_id == id).ToList();
                _ctx.TimeLine.RemoveRange(timelineEntries);

                var user = await userManager.FindByIdAsync(id.ToString());
                if (user != null)
                {
                    if (_ctx.SaveChanges() > -1)
                    {
                        await userManager.DeleteAsync(user);
                        return Ok();
                    }
                    else
                    {
                        return BadRequest("Couldn't delete user");
                    }
                }
                else
                {
                    return NotFound("User not found!");
                }
            }
            else
            {
                return BadRequest("Could not delete user related data");
            }
        }

        [HttpPost, DisableRequestSizeLimit]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("/api/account/UploadImage/{id}")]
        public ActionResult UploadImage(int id)
        {
            try
            {
                var file = Request.Form.Files[0];
                string folderName = "Uploads";
                string webRootPath = this.hostingEnvironment.WebRootPath;
                string newPath = Path.Combine(webRootPath, folderName);
                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }

                if (file.Length > 0)
                {
                    string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    string fullPath = Path.Combine(newPath, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    _ctx.Images.Add(new Image
                    {
                        user_id = id,
                        content_type = System.IO.Path.GetExtension(fileName).Substring(1),
                        filename = fileName
                    });
                }

                return Json("Upload Successful");
            }
            catch (Exception e)
            {
                return Json("Upload Failed: " + e.Message);
            }
        }
    }
}