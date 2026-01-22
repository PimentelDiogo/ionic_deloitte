using Microsoft.EntityFrameworkCore;
using DeloitteAPI.Models;

namespace DeloitteAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Equipamento> Equipamentos { get; set; }
    public DbSet<OrdemServico> OrdensServico { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configurar relacionamento Equipamento -> OrdemServico
        modelBuilder.Entity<OrdemServico>()
            .HasOne(os => os.Equipamento)
            .WithMany(e => e.OrdensServico)
            .HasForeignKey(os => os.EquipamentoId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
