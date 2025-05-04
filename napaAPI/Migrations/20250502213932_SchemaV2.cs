using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace napaAPI.Migrations
{
    /// <inheritdoc />
    public partial class SchemaV2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Country",
                table: "Ports");

            migrationBuilder.RenameColumn(
                name: "VoyageDate",
                table: "Voyages",
                newName: "Date");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Start",
                table: "Voyages",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "End",
                table: "Voyages",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "CountryId",
                table: "Ports",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "CountriesVisited",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CountryId = table.Column<int>(type: "int", nullable: false),
                    ShipId = table.Column<int>(type: "int", nullable: false),
                    DateVisited = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CountriesVisited", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CountriesVisited_Countries_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Countries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CountriesVisited_Ships_ShipId",
                        column: x => x.ShipId,
                        principalTable: "Ships",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ports_CountryId",
                table: "Ports",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_CountriesVisited_CountryId",
                table: "CountriesVisited",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_CountriesVisited_ShipId",
                table: "CountriesVisited",
                column: "ShipId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ports_Countries_CountryId",
                table: "Ports",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ports_Countries_CountryId",
                table: "Ports");

            migrationBuilder.DropTable(
                name: "CountriesVisited");

            migrationBuilder.DropIndex(
                name: "IX_Ports_CountryId",
                table: "Ports");

            migrationBuilder.DropColumn(
                name: "CountryId",
                table: "Ports");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Voyages",
                newName: "VoyageDate");

            migrationBuilder.AlterColumn<string>(
                name: "Start",
                table: "Voyages",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<string>(
                name: "End",
                table: "Voyages",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Ports",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
