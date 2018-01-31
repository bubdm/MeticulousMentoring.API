using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace MeticulousMentoring.API.Migrations
{
    public partial class removeSystem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GradingPeriods_Courses_courseid",
                table: "GradingPeriods");

            migrationBuilder.DropForeignKey(
                name: "FK_GradingPeriods_Systems_systemid",
                table: "GradingPeriods");

            migrationBuilder.DropIndex(
                name: "IX_GradingPeriods_courseid",
                table: "GradingPeriods");

            migrationBuilder.DropIndex(
                name: "IX_GradingPeriods_systemid",
                table: "GradingPeriods");

            migrationBuilder.DropColumn(
                name: "courseid",
                table: "GradingPeriods");

            migrationBuilder.DropColumn(
                name: "systemid",
                table: "GradingPeriods");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "courseid",
                table: "GradingPeriods",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "systemid",
                table: "GradingPeriods",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_GradingPeriods_courseid",
                table: "GradingPeriods",
                column: "courseid");

            migrationBuilder.CreateIndex(
                name: "IX_GradingPeriods_systemid",
                table: "GradingPeriods",
                column: "systemid");

            migrationBuilder.AddForeignKey(
                name: "FK_GradingPeriods_Courses_courseid",
                table: "GradingPeriods",
                column: "courseid",
                principalTable: "Courses",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_GradingPeriods_Systems_systemid",
                table: "GradingPeriods",
                column: "systemid",
                principalTable: "Systems",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
