using DeloitteAPI.Models;

namespace DeloitteAPI.Data;

public static class SeedData
{
    public static void Initialize(AppDbContext context)
    {
        // Garantir que o banco foi criado
        context.Database.EnsureCreated();

        // Verificar se já existe usuário admin
        if (!context.Usuarios.Any())
        {
            context.Usuarios.Add(new Usuario
            {
                Username = "admin",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                Role = "Admin"
            });
            context.SaveChanges();
        }

        // Verificar se já existem equipamentos
        if (!context.Equipamentos.Any())
        {
            var equipamentos = new List<Equipamento>
            {
                new Equipamento { Nome = "TV", Descricao = "Televisão" },
                new Equipamento { Nome = "Chuveiro", Descricao = "Chuveiro elétrico" },
                new Equipamento { Nome = "Porta", Descricao = "Porta" },
                new Equipamento { Nome = "Guarda-roupa", Descricao = "Guarda-roupa" },
                new Equipamento { Nome = "Ar Condicionado", Descricao = "Ar condicionado" }
            };
            
            context.Equipamentos.AddRange(equipamentos);
            context.SaveChanges();
        }
    }
}
