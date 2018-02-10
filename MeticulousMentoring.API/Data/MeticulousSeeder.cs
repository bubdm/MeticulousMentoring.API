using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeticulousMentoring.API.Data
{
    using MeticulousMentoring.API.Data.Entities;

    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Identity;

    public class MeticulousSeeder
    {
        private readonly MeticulousContext ctx;

        private readonly IHostingEnvironment hosting;

        private readonly UserManager<MeticulousUser> userManager;

        private readonly RoleManager<IdentityRole<int>> roleManager;

        public MeticulousSeeder(MeticulousContext ctx, IHostingEnvironment hosting, UserManager<MeticulousUser> userManager, RoleManager<IdentityRole<int>> roleManager)
        {
            this.ctx = ctx;
            this.hosting = hosting;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        public async Task Seed()
        {
            this.ctx.Database.EnsureCreated();

            string[] roles = { "Admin", "Director", "Mentor", "Mentee" };

            foreach (var role in roles)
            {
                var roleExist = await this.roleManager.RoleExistsAsync(role);

                if (!roleExist)
                {
                    await this.roleManager.CreateAsync(new IdentityRole<int>(role));
                }
            }

            //// Add Admin User
            var user = await this.userManager.FindByEmailAsync("admin@meticulous.com");

            if (user == null)
            {
                user = new MeticulousUser()
                {
                    UserName = "admin@meticulous.com",
                    Email = "admin@meticulous.com"
                };

                var result = await this.userManager.CreateAsync(user, "War3agle!");

                if (result != IdentityResult.Success)
                {
                    throw new InvalidOperationException("Failed to create default user");
                }
                else
                {
                    await this.userManager.AddToRoleAsync(user, "Admin");
                }
            }
            //// End Add Admin User

            ////Add Director
            var director = await this.userManager.FindByEmailAsync("director@meticulous.com");

            if (director == null)
            {
                director = new MeticulousUser()
                {
                    UserName = "director@meticulous.com",
                    Email = "director@meticulous.com"
                };

                var directorResult = await this.userManager.CreateAsync(director, "War3agle!");

                if (directorResult == IdentityResult.Success)
                {
                    await this.userManager.AddToRoleAsync(director, "Director");
                }
            }
            ////End Add Director

            ////Add Mentee
            var mentee = await this.userManager.FindByEmailAsync("ty.wright@meticulous.com");

            if (mentee == null)
            {
                mentee = new MeticulousUser()
                {
                    UserName = "ty.wright@meticulous.com",
                    Email = "ty.wright@meticulous.com"
                };

                var menteeResult = await this.userManager.CreateAsync(mentee, "War3agle!");

                if (menteeResult == IdentityResult.Success)
                {
                    await this.userManager.AddToRoleAsync(mentee, "Mentee");

                    var menteeAddress = new Address()
                    {
                        address1 = "709 Stonewall Drive",
                        city = "Irondale",
                        state = "AL",
                        zip = "35210"
                    };

                    var menteeSchoolAddress = new Address()
                    {
                        address1 = "6100 Old Leeds Rd",
                        city = "Irondale",
                        state = "AL",
                        zip = "35210"
                    };

                    var menteeSchool = new School()
                    {
                        school_name = "Shades Valley High School",
                        address = menteeSchoolAddress,
                        principal = "Antjuan Marsh",
                        system = ctx.Systems.Find(1)
                    };

                    var newMentee = new Mentee()
                    {
                        id = mentee.Id,
                        first_name = "Ty",
                        middle = "Kristopher",
                        last_name = "Wright",
                        gender = "M",
                        dob = Convert.ToDateTime("2000-08-29T00:00:00"),
                        email = "ty.wright@meticulous.com",
                        created_on = Convert.ToDateTime("2017-12-13T00:00:00"),
                        modified_on = Convert.ToDateTime("2017-12-13T00:00:00"),
                        is_active = true,
                        address = menteeAddress,
                        school = menteeSchool,
                        classification = ctx.Classifications.Find(4)
                    };

                    this.ctx.Addresses.Add(menteeAddress);
                    this.ctx.Addresses.Add(menteeSchoolAddress);
                    this.ctx.Schools.Add(menteeSchool);
                    this.ctx.Mentees.Add(newMentee);
                    this.ctx.SaveChanges();
                }
            }
            ////End Add Mentee

            ////Add Mentor
            var mentor = await this.userManager.FindByEmailAsync("joe.mentor@meticulous.com");

            if (mentor == null)
            {
                mentor = new MeticulousUser()
                {
                    UserName = "joe.mentor@meticulous.com",
                    Email = "joe.mentor@meticulous.com"
                };

                var mentorResult = await this.userManager.CreateAsync(mentor, "War3agle!");

                if (mentorResult == IdentityResult.Success)
                {
                    await this.userManager.AddToRoleAsync(mentor, "Mentor");

                    var mentorAddress = new Address()
                    {
                        address1 = "1254 Mentor Way",
                        city = "Birmingham",
                        state = "AL",
                        zip = "35207"
                    };

                    var newMentor = new Mentor()
                    {
                        id = mentor.Id,
                        first_name = "Joe",
                        last_name = "Mentor",
                        gender = "M",
                        address = mentorAddress,
                        is_active = true,
                        created_on = Convert.ToDateTime(DateTime.Now),
                        modified_on = Convert.ToDateTime(DateTime.Now),
                        mentees = null
                    };

                    this.ctx.Addresses.Add(mentorAddress);
                    this.ctx.Mentors.Add(newMentor);
                    this.ctx.SaveChanges();
                }
            }//// End Add Mentor

            ////Add Guardian
            var guardian = ctx.Guardians.Single(x => x.email == "aqwright@gmail.com");

            if (guardian == null)
            {
                guardian = new Guardian()
                {
                    first_name = "Anthony",
                    last_name = "Wright II",
                    address = ctx.Addresses.SingleOrDefault(x => x.address1 == "709 Stonewall Dr"),
                    gender = "M",
                    email = "aqwright@gmail.com",
                    middle = "Q",
                    children = null
                };

                this.ctx.Guardians.Add(guardian);
                this.ctx.SaveChanges();
            }
            //// End Add Guardian

            ////Update Mentee
            var updatedMentee = ctx.Mentees.SingleOrDefault(x => x.email == "ty.wright@meticulous.com");
            var addedMentor = ctx.Mentors.SingleOrDefault(x => x.last_name == "Mentor");
            var addedGuardian = ctx.Guardians.SingleOrDefault(x => x.email == "aqwright@gmail.com");

            if (addedMentor.mentees == null)
            {
                addedMentor.mentees = new List<Mentee>();
                addedMentor.mentees.Add(updatedMentee);
                this.ctx.Mentors.Update(addedMentor);
                this.ctx.SaveChanges();
            }

            if (addedGuardian.children == null)
            {
                addedGuardian.children = new List<Mentee>();
                addedGuardian.children.Add(updatedMentee);
                this.ctx.Guardians.Update(addedGuardian);
                this.ctx.SaveChanges();
            }
        }
    }
}