using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Estudante> Estudantes => Set<Estudante>();
        public DbSet<Nota> Notas => Set<Nota>();
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Nota>()
                .HasOne(n => n.Estudante)         
                .WithMany(e => e.Notas)           
                .HasForeignKey(n => n.EstudanteId) 
                .OnDelete(DeleteBehavior.Cascade); 
        }
    }
}

