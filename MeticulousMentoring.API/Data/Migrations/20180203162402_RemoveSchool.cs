using Microsoft.EntityFrameworkCore.Migrations;

namespace MeticulousMentoring.API.Migrations
{
    public partial class RemoveSchool : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Schools_course_schoolid",
                table: "Courses");

            migrationBuilder.DropIndex(
                name: "IX_Courses_course_schoolid",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "course_schoolid",
                table: "Courses");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "course_schoolid",
                table: "Courses",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Courses_course_schoolid",
                table: "Courses",
                column: "course_schoolid");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Schools_course_schoolid",
                table: "Courses",
                column: "course_schoolid",
                principalTable: "Schools",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}