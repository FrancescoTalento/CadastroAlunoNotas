using backend.Data;
using backend.Models;

namespace backend.Helpers
{
    public static class DbSeeder
    {
        public static void SeedDisciplinas(AppDbContext db)
        {
            if (db.Disciplinas.Any()) return; 

            var disciplinasFixas = new[]
            {
                "Matemática",
                "Português",
                "História",
                "Geografia",
                "Ciências"
            };

            foreach (var nome in disciplinasFixas)
            {
                db.Disciplinas.Add(new Disciplina { Nome = nome });
            }

            db.SaveChanges();
        }
    }
}
