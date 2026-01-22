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
    }
}
