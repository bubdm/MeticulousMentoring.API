using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace MeticulousMentoring.API.Migrations
{
    public partial class UpdateGradeTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<int>(
                name: "periodid",
                table: "Grades",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Grades_periodid",
                table: "Grades",
                column: "periodid");

            migrationBuilder.AddForeignKey(
                name: "FK_Grades_GradingPeriods_periodid",
                table: "Grades",
                column: "periodid",
                principalTable: "GradingPeriods",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Grades_GradingPeriods_periodid",
                table: "Grades");

            migrationBuilder.DropIndex(
                name: "IX_Grades_periodid",
                table: "Grades");

            migrationBuilder.DropColumn(
                name: "periodid",
                table: "Grades");

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
    }
}
