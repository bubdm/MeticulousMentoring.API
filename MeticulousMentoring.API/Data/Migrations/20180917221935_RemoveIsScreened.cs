using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace MeticulousMentoring.API.Migrations
{
    public partial class RemoveIsScreened : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isScreened",
                table: "Users");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isScreened",
                table: "Users",
                nullable: false,
                defaultValue: false);
        }
    }
}
