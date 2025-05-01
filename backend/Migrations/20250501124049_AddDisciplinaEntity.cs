using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddDisciplinaEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "disciplina",
                table: "Notas");

            migrationBuilder.AddColumn<int>(
                name: "id_disciplina",
                table: "Notas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Disciplinas",
                columns: table => new
                {
                    id_disciplina = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    nome = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Disciplinas", x => x.id_disciplina);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Notas_id_disciplina",
                table: "Notas",
                column: "id_disciplina");

            migrationBuilder.CreateIndex(
                name: "IX_Disciplinas_nome",
                table: "Disciplinas",
                column: "nome",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Notas_Disciplinas_id_disciplina",
                table: "Notas",
                column: "id_disciplina",
                principalTable: "Disciplinas",
                principalColumn: "id_disciplina",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notas_Disciplinas_id_disciplina",
                table: "Notas");

            migrationBuilder.DropTable(
                name: "Disciplinas");

            migrationBuilder.DropIndex(
                name: "IX_Notas_id_disciplina",
                table: "Notas");

            migrationBuilder.DropColumn(
                name: "id_disciplina",
                table: "Notas");

            migrationBuilder.AddColumn<string>(
                name: "disciplina",
                table: "Notas",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
