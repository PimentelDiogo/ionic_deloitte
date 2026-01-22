---
name: Deloitte Backend API Skill
description: Especificações para desenvolvimento da API REST em .NET Core com autenticação JWT
---

# Backend API - .NET Core

## Stack Técnica

- **.NET Core 6+**
- **Entity Framework Core**
- **SQL Server / LocalDB / SQLite**
- **JWT Bearer Authentication**
- **Swagger/OpenAPI**

## Requisitos de Autenticação

### JWT Bearer Token

> [!IMPORTANT]
> Todas as rotas de manipulação de dados (CRUD) devem exigir um token válido.

1. **Endpoint de Login**
   - Rota: `POST /api/auth/login`
   - Recebe: `{ "username": "string", "password": "string" }`
   - Retorna: `{ "token": "jwt_token", "expiration": "datetime" }`

2. **Seed de Usuário Admin**
   - Não é necessário endpoint de cadastro
   - Criar usuário fixo no banco via seed/migration:
     ```
     Username: admin
     Password: admin123 (hashear com BCrypt)
     ```

### Configuração JWT (appsettings.json)

```json
{
  "JwtSettings": {
    "SecretKey": "sua-chave-secreta-com-pelo-menos-32-caracteres",
    "Issuer": "deloitte-api",
    "Audience": "deloitte-mobile",
    "ExpirationHours": 24
  }
}
```

---

## Endpoints da API

### Autenticação

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| POST | `/api/auth/login` | Login e geração de token | Não |

### Equipamentos

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| GET | `/api/equipamentos` | Listar todos | Sim |
| GET | `/api/equipamentos/{id}` | Obter por ID | Sim |
| POST | `/api/equipamentos` | Criar novo | Sim |
| PUT | `/api/equipamentos/{id}` | Atualizar | Sim |
| DELETE | `/api/equipamentos/{id}` | Remover | Sim |

### Ordens de Serviço

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| GET | `/api/ordens-servico` | Listar todas | Sim |
| GET | `/api/ordens-servico/{id}` | Obter por ID | Sim |
| POST | `/api/ordens-servico` | Criar nova | Sim |
| PATCH | `/api/ordens-servico/{id}/finalizar` | Finalizar OS | Sim |

---

## Estrutura de Pastas Recomendada

```
backend/
├── DeloitteAPI/
│   ├── Controllers/
│   │   ├── AuthController.cs
│   │   ├── EquipamentosController.cs
│   │   └── OrdensServicoController.cs
│   ├── Models/
│   │   ├── Usuario.cs
│   │   ├── Equipamento.cs
│   │   └── OrdemServico.cs
│   ├── DTOs/
│   │   ├── LoginRequest.cs
│   │   ├── LoginResponse.cs
│   │   ├── EquipamentoDto.cs
│   │   └── OrdemServicoDto.cs
│   ├── Services/
│   │   ├── IAuthService.cs
│   │   ├── AuthService.cs
│   │   ├── IEquipamentoService.cs
│   │   ├── EquipamentoService.cs
│   │   ├── IOrdemServicoService.cs
│   │   └── OrdemServicoService.cs
│   ├── Data/
│   │   ├── AppDbContext.cs
│   │   └── SeedData.cs
│   ├── Configurations/
│   │   └── JwtSettings.cs
│   ├── Program.cs
│   └── appsettings.json
└── DeloitteAPI.Tests/
```

---

## Models

### Usuario.cs
```csharp
public class Usuario
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Role { get; set; } = "User";
}
```

### Equipamento.cs
```csharp
public class Equipamento
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public DateTime DataCadastro { get; set; } = DateTime.UtcNow;
    public bool Ativo { get; set; } = true;
    
    public ICollection<OrdemServico> OrdensServico { get; set; } = new List<OrdemServico>();
}
```

### OrdemServico.cs
```csharp
public enum StatusOS
{
    Aberta,
    Finalizada
}

public class OrdemServico
{
    public int Id { get; set; }
    public int EquipamentoId { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public DateTime DataAbertura { get; set; } = DateTime.UtcNow;
    public DateTime? DataFinalizacao { get; set; }
    public StatusOS Status { get; set; } = StatusOS.Aberta;
    
    public Equipamento? Equipamento { get; set; }
}
```

---

## Configurações Obrigatórias

### Program.cs - Configuração JWT

```csharp
// JWT Configuration
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>();
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings.Issuer,
            ValidAudience = jwtSettings.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtSettings.SecretKey))
        };
    });

builder.Services.AddAuthorization();
```

### Swagger com Suporte a JWT

```csharp
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Deloitte API", Version = "v1" });
    
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header usando Bearer scheme",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});
```

### Controller com [Authorize]

```csharp
[ApiController]
[Route("api/[controller]")]
[Authorize]  // Todas as rotas protegidas
public class EquipamentosController : ControllerBase
{
    // CRUD endpoints aqui
}
```

---

## Seed de Dados Inicial

```csharp
public static class SeedData
{
    public static void Initialize(AppDbContext context)
    {
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
```

---

## Comandos Úteis

```bash
# Criar projeto
dotnet new webapi -n DeloitteAPI

# Adicionar pacotes
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package BCrypt.Net-Next
dotnet add package Swashbuckle.AspNetCore

# Migrations
dotnet ef migrations add InitialCreate
dotnet ef database update

# Executar
dotnet run
```

---

## Checklist de Validação

- [ ] Endpoint de login funcional retornando JWT
- [ ] Usuário admin seedado no banco
- [ ] CRUD completo de Equipamentos com [Authorize]
- [ ] CRUD de Ordens de Serviço com [Authorize]
- [ ] Endpoint para finalizar OS
- [ ] Swagger funcionando com botão "Authorize"
- [ ] Entity Framework configurado
- [ ] Token sendo validado corretamente
