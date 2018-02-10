using Microsoft.EntityFrameworkCore.Migrations;

namespace MeticulousMentoring.API.Migrations
{
    public partial class SystemId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "systemid",
                table: "Courses",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Courses_systemid",
                table: "Courses",
                column: "systemid");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Systems_systemid",
                table: "Courses",
                column: "systemid",
                principalTable: "Systems",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Systems_systemid",
                table: "Courses");

            migrationBuilder.DropIndex(
                name: "IX_Courses_systemid",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "systemid",
                table: "Courses");
        }
    }
}