using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NETCore.DapperKit.Extensions;
using MeticulousMentoring.API.Data.Entities;
using NETCore.DapperKit;
using AutoMapper;


namespace MeticulousMentoring.API
{
    using System.Text;

    using MeticulousMentoring.API.Data;
    using MeticulousMentoring.API.Data.Repositories;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.IdentityModel.Tokens;
    using Newtonsoft.Json;

    public class Startup
    {
        private readonly IConfiguration config;
        private readonly IHostingEnvironment env;

        public Startup(IConfiguration config, IHostingEnvironment env)
        {
            this.config = config;
            this.env = env;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddIdentity<MeticulousUser, IdentityRole<int>>(
                cfg => { cfg.User.RequireUniqueEmail = true; }).AddEntityFrameworkStores<MeticulousContext>();

            services.AddAuthentication()
                .AddCookie()
                .AddJwtBearer(cfg =>
                    {
                        cfg.TokenValidationParameters = new TokenValidationParameters()
                                                            {
                                                                ValidIssuer = config["Tokens:Issuer"],
                                                                ValidAudience = config["Tokens:Audience"],
                                                                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Tokens:Key"]))
                                                            };

                    });

            services.AddDbContext<MeticulousContext>(
                cfg => { cfg.UseSqlServer(this.config.GetConnectionString("MeticulousConnectionString")); });

            services.AddAutoMapper();
            services.AddTransient<MeticulousSeeder>();
            services.AddScoped<IMenteeRepository, MenteeRepository>();
            services.AddScoped<IMentorRepository, MentorRepository>();
            services.AddScoped<IClassificationRepository, ClassificationRepository>();
            services.AddScoped<IEducationSystemRepository, EducationSystemRepository>();
            services.AddScoped<ISchoolRepository, SchoolRepository>();
            services.AddScoped<IDirectorRepository, DirectorRepository>();

            services.AddCors(
                cfg =>
                    {
                        cfg.AddPolicy("Meticulous",
                            bldr => { bldr.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:5003"); });

                        cfg.AddPolicy("AnyGET",
                            bldr => { bldr.AllowAnyHeader().WithMethods("GET").AllowAnyOrigin(); });
                    });


            //services.AddMvcCore().AddAuthorization().AddJsonFormatters();

            services.AddMvc(opt =>
                    {
                        if (env.IsProduction())
                        {
                            opt.Filters.Add(new RequireHttpsAttribute());
                        }
                    })
                .AddJsonOptions(opt => opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);
           
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("Meticulous");

            app.UseAuthentication();

            app.UseMvc(
                config => { config.MapRoute("MeticulousAPIRoute", "api/{controller}/{action}"); });
        }
    }
}
