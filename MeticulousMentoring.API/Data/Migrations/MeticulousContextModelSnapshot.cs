﻿// <auto-generated />
using MeticulousMentoring.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace MeticulousMentoring.API.Migrations
{
    [DbContext(typeof(MeticulousContext))]
    partial class MeticulousContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("MeticulousMentoring.API.Data.Entities.Address", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("address1");

                    b.Property<string>("address2");

                    b.Property<int>("address_type");

                    b.Property<string>("city");

                    b.Property<DateTime?>("created_on");

                    b.Property<DateTime?>("modified_on");

                    b.Property<string>("state");

                    b.Property<string>("zip");

                    b.HasKey("id");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("MeticulousMentoring.API.Data.Entities.Classification", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("classification_id");

                    b.Property<DateTime?>("created_on");

                    b.Property<string>("description");

                    b.Property<DateTime?>("modified_on");

                    b.HasKey("id");

                    b.ToTable("Classifications");
                });

            modelBuilder.Entity("MeticulousMentoring.API.Data.Entities.Course", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("course_classificationid");

                    b.Property<string>("course_name");

                    b.Property<DateTime?>("created_on");

                    b.Property<DateTime?>("modified_on");

                    b.Property<int?>("systemid");

                    b.HasKey("id");

                    b.HasIndex("course_classificationid");

                    b.HasIndex("systemid");

                    b.ToTable("Courses");
                });

            modelBuilder.Entity("MeticulousMentoring.API.Data.Entities.Director", b =>
                {
                    b.Property<int?>("id");

                    b.Property<DateTime?>("created_on");

                    b.Property<string>("email");

                    b.Property<string>("first_name");

                    b.Property<bool>("is_active");

                    b.Property<string>("last_name");

                    b.Property<DateTime?>("modified_on");

                    b.HasKey("id");

                    b.ToTable("Directors");
                });

            modelBuilder.Entity("MeticulousMentoring.API.Data.Entities.EducationSystem", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("system");

                    b.HasKey("id");

                    b.ToTable("Systems");
                });

            modelBuilder.Entity("MeticulousMentoring.API.Data.Entities.Grade", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("created_on");

                    b.Property<int?>("grade_courseid");

                    b.Property<decimal>("grade_value");

                    b.Property<int>("mentee_id");

                    b.Property<DateTime?>("modified_on");

                    b.Property<int?>("periodid");

                    b.Property<string>("school_year");

                    b.HasKey("id");

                    b.HasIndex("grade_courseid");

                    b.HasIndex("periodid");

                    b.ToTable("Grades");
                });

            modelBuilder.Entity("MeticulousMentoring.API.Data.Entities.GradePeriod", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("description");

                    b.Property<int>("period");

                    b.HasKey("id");

                    b.ToTable("GradingPeriods");
                });

            modelBuilder.Entity("MeticulousMentoring.API.Data.Entities.Guardian", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("addressid");

                    b.Property<DateTime?>("created_on");

                    b.Property<string>("email");

                    b.Property<string>("first_name");

                    b.Property<string>("gender");

                    b.Property<string>("last_name");

                    b.Property<string>("middle");

                    b.Property<DateTime?>("modified_on");

                    b.HasKey("id");

                    b.HasIndex("addressid");

                    b.ToTable("Guardians");
                });

            modelBuilder.Entity("MeticulousMentoring.API.Data.Entities.Mentee", b =>
                {
                    b.Property<int?>("id");

                    b.Property<int?>("Guardianid");

                    b.Property<int?>("Mentorid");

                    b.Property<int?>("addressid");

                    b.Property<int?>("classificationid");

                    b.Property<DateTime?>("created_on");

                    b.Property<DateTime>("dob");

                    b.Property<string>("email");

                    b.Property<string>("first_name");

                    b.Property<string>("gender");

                    b.Property<bool>("is_active");

                    b.Property<string>("last_name");

                    b.Property<string>("middle");

                    b.Property<DateTime?>("modified_on");

                    b.Property<int?>("schoolid");

                    b.HasKey("id");

                    b.HasIndex("Guardianid");

                    b.HasIndex("Mentorid");

                    b.HasIndex("addressid");

                    b.HasIndex("classificationid");

                    b.HasIndex("schoolid");

                    b.ToTable("Mentees");
                });

            modelBuilder.Entity("MeticulousMentoring.API.Data.Entities.Mentor", b =>
                {
                    b.Property<int?>("id");

                    b.Property<int?>("addressid");

                    b.Property<DateTime?>("created_on");

                    b.Property<string>("email");

                    b.Property<string>("first_name");

                    b.Property<string>("gender");

                    b.Property<bool>("is_active");

                    b.Property<string>("last_name");

                    b.Property<DateTime?>("modified_on");

                    b.HasKey("id");

                    b.HasIndex("addressid");

                    b.ToTable("Mentors");
                });

            modelBuilder.Entity("MeticulousMentoring.API.Data.Entities.MeticulousUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("MeticulousMentoring.API.Data.Entities.School", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("addressid");

                    b.Property<DateTime?>("created_on");

                    b.Property<DateTime?>("modified_on");

                    b.Property<string>("principal");

                    b.Property<string>("school_name");

                    b.Property<int?>("systemid");

                    b.HasKey("id");

                    b.HasIndex("addressid");

                    b.HasIndex("systemid");

                    b.ToTable("Schools");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<int>("RoleId");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("RoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<int>("UserId");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("UserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<int>", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<int>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("UserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("UserTokens");
                });

            modelBuilder.Entity("MeticulousMentoring.API.Data.Entities.Course", b =>
                {
                    b.HasOne("MeticulousMentoring.API.Data.Entities.Classification", "course_classification")
                        .WithMany()
                        .HasForeignKey("course_classificationid");

                    b.HasOne("MeticulousMentoring.API.Data.Entities.EducationSystem", "system")
                        .WithMany()
                        .HasForeignKey("systemid");
                });

            modelBuilder.Entity("MeticulousMentoring.API.Data.Entities.Grade", b =>
                {
                    b.HasOne("MeticulousMentoring.API.Data.Entities.Course", "grade_course")
                        .WithMany()
                        .HasForeignKey("grade_courseid");

                    b.HasOne("MeticulousMentoring.API.Data.Entities.GradePeriod", "period")
                        .WithMany()
                        .HasForeignKey("periodid");
                });

            modelBuilder.Entity("MeticulousMentoring.API.Data.Entities.Guardian", b =>
                {
                    b.HasOne("MeticulousMentoring.API.Data.Entities.Address", "address")
                        .WithMany()
                        .HasForeignKey("addressid");
                });

            modelBuilder.Entity("MeticulousMentoring.API.Data.Entities.Mentee", b =>
                {
                    b.HasOne("MeticulousMentoring.API.Data.Entities.Guardian")
                        .WithMany("children")
                        .HasForeignKey("Guardianid");

                    b.HasOne("MeticulousMentoring.API.Data.Entities.Mentor")
                        .WithMany("mentees")
                        .HasForeignKey("Mentorid");

                    b.HasOne("MeticulousMentoring.API.Data.Entities.Address", "address")
                        .WithMany()
                        .HasForeignKey("addressid");

                    b.HasOne("MeticulousMentoring.API.Data.Entities.Classification", "classification")
                        .WithMany()
                        .HasForeignKey("classificationid");

                    b.HasOne("MeticulousMentoring.API.Data.Entities.School", "school")
                        .WithMany()
                        .HasForeignKey("schoolid");
                });

            modelBuilder.Entity("MeticulousMentoring.API.Data.Entities.Mentor", b =>
                {
                    b.HasOne("MeticulousMentoring.API.Data.Entities.Address", "address")
                        .WithMany()
                        .HasForeignKey("addressid");
                });

            modelBuilder.Entity("MeticulousMentoring.API.Data.Entities.School", b =>
                {
                    b.HasOne("MeticulousMentoring.API.Data.Entities.Address", "address")
                        .WithMany()
                        .HasForeignKey("addressid");

                    b.HasOne("MeticulousMentoring.API.Data.Entities.EducationSystem", "system")
                        .WithMany()
                        .HasForeignKey("systemid");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole<int>")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.HasOne("MeticulousMentoring.API.Data.Entities.MeticulousUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.HasOne("MeticulousMentoring.API.Data.Entities.MeticulousUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<int>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole<int>")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MeticulousMentoring.API.Data.Entities.MeticulousUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.HasOne("MeticulousMentoring.API.Data.Entities.MeticulousUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
