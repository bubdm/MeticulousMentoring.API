using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace MeticulousMentoring.API.Migrations
{
    public partial class GPATables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GradePointAverages",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    created_on = table.Column<DateTime>(nullable: false),
                    gpa = table.Column<decimal>(nullable: false),
                    mentee_id = table.Column<int>(nullable: false),
                    modified_on = table.Column<DateTime>(nullable: false),
                    period_id = table.Column<int>(nullable: false),
                    school_year = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GradePointAverages", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GradePointAverages");
        }
    }
}
