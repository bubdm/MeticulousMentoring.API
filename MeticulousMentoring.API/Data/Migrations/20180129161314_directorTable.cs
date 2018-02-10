using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace MeticulousMentoring.API.Migrations
{
    public partial class directorTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Directors",
                columns: table => new
                {
                    id = table.Column<int>(nullable: true),
                    created_on = table.Column<DateTime>(nullable: true),
                    first_name = table.Column<string>(nullable: true),
                    is_active = table.Column<bool>(nullable: false),
                    last_name = table.Column<string>(nullable: true),
                    modified_on = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Directors", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Directors");
        }
    }
}