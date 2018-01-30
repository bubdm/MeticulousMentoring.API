using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace MeticulousMentoring.API.Migrations
{
    public partial class InitialDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    address1 = table.Column<string>(nullable: true),
                    address2 = table.Column<string>(nullable: true),
                    address_type = table.Column<int>(nullable: false),
                    city = table.Column<string>(nullable: true),
                    created_on = table.Column<DateTime>(nullable: true),
                    modified_on = table.Column<DateTime>(nullable: true),
                    state = table.Column<string>(nullable: true),
                    zip = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Classification",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    classification_id = table.Column<int>(nullable: false),
                    created_on = table.Column<DateTime>(nullable: true),
                    description = table.Column<string>(nullable: true),
                    modified_on = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Classification", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "EducationSystem",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    system = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EducationSystem", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Guardians",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    addressid = table.Column<int>(nullable: true),
                    created_on = table.Column<DateTime>(nullable: true),
                    email = table.Column<string>(nullable: true),
                    first_name = table.Column<string>(nullable: true),
                    gender = table.Column<string>(nullable: true),
                    last_name = table.Column<string>(nullable: true),
                    middle = table.Column<string>(nullable: true),
                    modified_on = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Guardians", x => x.id);
                    table.ForeignKey(
                        name: "FK_Guardians_Addresses_addressid",
                        column: x => x.addressid,
                        principalTable: "Addresses",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Mentors",
                columns: table => new
                {
                    id = table.Column<int>(nullable: true),
                    addressid = table.Column<int>(nullable: true),
                    created_on = table.Column<DateTime>(nullable: true),
                    first_name = table.Column<string>(nullable: true),
                    gender = table.Column<string>(nullable: true),
                    is_active = table.Column<bool>(nullable: false),
                    last_name = table.Column<string>(nullable: true),
                    modified_on = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    //table.ForeignKey(
                    //    name: "FK_Mentors_Users_id",
                    //    column: x => x.id,
                    //    principalTable: "Users",
                    //    principalColumn: "id",
                    //    onDelete: ReferentialAction.Cascade
                    //    );
                    table.ForeignKey(
                        name: "FK_Mentors_Addresses_addressid",
                        column: x => x.addressid,
                        principalTable: "Addresses",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "School",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    addressid = table.Column<int>(nullable: true),
                    created_on = table.Column<DateTime>(nullable: true),
                    modified_on = table.Column<DateTime>(nullable: true),
                    principal = table.Column<string>(nullable: true),
                    school_name = table.Column<string>(nullable: true),
                    systemid = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_School", x => x.id);
                    table.ForeignKey(
                        name: "FK_School_Addresses_addressid",
                        column: x => x.addressid,
                        principalTable: "Addresses",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_School_EducationSystem_systemid",
                        column: x => x.systemid,
                        principalTable: "EducationSystem",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Mentees",
                columns: table => new
                {
                    id = table.Column<int>(nullable: true),
                    Guardianid = table.Column<int>(nullable: true),
                    Mentorid = table.Column<int>(nullable: true),
                    addressid = table.Column<int>(nullable: true),
                    classificationid = table.Column<int>(nullable: true),
                    created_on = table.Column<DateTime>(nullable: true),
                    dob = table.Column<DateTime>(nullable: false),
                    email = table.Column<string>(nullable: true),
                    first_name = table.Column<string>(nullable: true),
                    gender = table.Column<string>(nullable: true),
                    is_active = table.Column<bool>(nullable: false),
                    last_name = table.Column<string>(nullable: true),
                    middle = table.Column<string>(nullable: true),
                    modified_on = table.Column<DateTime>(nullable: true),
                    schoolid = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                   //table.ForeignKey(
                   //     name: "FK_Mentees_Users_Id",
                   //     column: x => x.id,
                   //     principalTable: "Users",
                   //     principalColumn: "id",
                   //     onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Mentees_Guardians_Guardianid",
                        column: x => x.Guardianid,
                        principalTable: "Guardians",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    //table.ForeignKey(
                    //    name: "FK_Mentees_Mentors_Mentorid",
                    //    column: x => x.Mentorid,
                    //    principalTable: "Mentors",
                    //    principalColumn: "id",
                    //    onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Mentees_Addresses_addressid",
                        column: x => x.addressid,
                        principalTable: "Addresses",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Mentees_Classification_classificationid",
                        column: x => x.classificationid,
                        principalTable: "Classification",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Mentees_School_schoolid",
                        column: x => x.schoolid,
                        principalTable: "School",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Guardians_addressid",
                table: "Guardians",
                column: "addressid");

            migrationBuilder.CreateIndex(
                name: "IX_Mentees_Guardianid",
                table: "Mentees",
                column: "Guardianid");

            migrationBuilder.CreateIndex(
                name: "IX_Mentees_Mentorid",
                table: "Mentees",
                column: "Mentorid");

            migrationBuilder.CreateIndex(
                name: "IX_Mentees_addressid",
                table: "Mentees",
                column: "addressid");

            migrationBuilder.CreateIndex(
                name: "IX_Mentees_classificationid",
                table: "Mentees",
                column: "classificationid");

            migrationBuilder.CreateIndex(
                name: "IX_Mentees_schoolid",
                table: "Mentees",
                column: "schoolid");

            migrationBuilder.CreateIndex(
                name: "IX_Mentors_addressid",
                table: "Mentors",
                column: "addressid");

            migrationBuilder.CreateIndex(
                name: "IX_School_addressid",
                table: "School",
                column: "addressid");

            migrationBuilder.CreateIndex(
                name: "IX_School_systemid",
                table: "School",
                column: "systemid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Mentees");

            migrationBuilder.DropTable(
                name: "Guardians");

            migrationBuilder.DropTable(
                name: "Mentors");

            migrationBuilder.DropTable(
                name: "Classification");

            migrationBuilder.DropTable(
                name: "School");

            migrationBuilder.DropTable(
                name: "Addresses");

            migrationBuilder.DropTable(
                name: "EducationSystem");
        }
    }
}
