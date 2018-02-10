using Microsoft.EntityFrameworkCore.Migrations;

namespace MeticulousMentoring.API.Migrations
{
    public partial class periodDescription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "GradingPeriods",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "description",
                table: "GradingPeriods");
        }
    }
}