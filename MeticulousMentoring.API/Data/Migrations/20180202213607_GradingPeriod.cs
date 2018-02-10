using Microsoft.EntityFrameworkCore.Migrations;

namespace MeticulousMentoring.API.Migrations
{
    public partial class GradingPeriod : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "periodid",
                table: "Courses",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Courses_periodid",
                table: "Courses",
                column: "periodid");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_GradingPeriods_periodid",
                table: "Courses",
                column: "periodid",
                principalTable: "GradingPeriods",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_GradingPeriods_periodid",
                table: "Courses");

            migrationBuilder.DropIndex(
                name: "IX_Courses_periodid",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "periodid",
                table: "Courses");
        }
    }
}