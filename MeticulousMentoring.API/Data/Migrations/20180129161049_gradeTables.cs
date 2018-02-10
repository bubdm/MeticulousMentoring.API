using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace MeticulousMentoring.API.Migrations
{
    public partial class gradeTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    course_classificationid = table.Column<int>(nullable: true),
                    course_name = table.Column<string>(nullable: true),
                    course_schoolid = table.Column<int>(nullable: true),
                    created_on = table.Column<DateTime>(nullable: true),
                    modified_on = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courses", x => x.id);
                    table.ForeignKey(
                        name: "FK_Courses_Classifications_course_classificationid",
                        column: x => x.course_classificationid,
                        principalTable: "Classifications",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Courses_Schools_course_schoolid",
                        column: x => x.course_schoolid,
                        principalTable: "Schools",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Grades",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    grade_courseid = table.Column<int>(nullable: true),
                    mentee_id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grades", x => x.id);
                    table.ForeignKey(
                        name: "FK_Grades_Courses_grade_courseid",
                        column: x => x.grade_courseid,
                        principalTable: "Courses",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "GradingPeriods",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    courseid = table.Column<int>(nullable: true),
                    period = table.Column<int>(nullable: false),
                    systemid = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GradingPeriods", x => x.id);
                    table.ForeignKey(
                        name: "FK_GradingPeriods_Courses_courseid",
                        column: x => x.courseid,
                        principalTable: "Courses",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_GradingPeriods_Systems_systemid",
                        column: x => x.systemid,
                        principalTable: "Systems",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Courses_course_classificationid",
                table: "Courses",
                column: "course_classificationid");

            migrationBuilder.CreateIndex(
                name: "IX_Courses_course_schoolid",
                table: "Courses",
                column: "course_schoolid");

            migrationBuilder.CreateIndex(
                name: "IX_Grades_grade_courseid",
                table: "Grades",
                column: "grade_courseid");

            migrationBuilder.CreateIndex(
                name: "IX_GradingPeriods_courseid",
                table: "GradingPeriods",
                column: "courseid");

            migrationBuilder.CreateIndex(
                name: "IX_GradingPeriods_systemid",
                table: "GradingPeriods",
                column: "systemid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Grades");

            migrationBuilder.DropTable(
                name: "GradingPeriods");

            migrationBuilder.DropTable(
                name: "Courses");
        }
    }
}