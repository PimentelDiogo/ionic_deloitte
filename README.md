# Desafio Técnico Deloitte

Sistema completo de gestão de equipamentos e ordens de serviço com backend .NET e mobile Ionic + Angular.

---

## 📋 Credenciais de Teste

O usuário admin será criado automaticamente com:

- **Username**: `admin`
- **Password**: `admin123`

---

## 🏗️ Arquitetura

### Backend (.NET 10)

**Service-Repository Pattern com Clean Architecture Simplificada**

```
Controllers → Services → DbContext → Models
     ↓
   DTOs (Data Transfer Objects)
```

**Camadas:**
- **Controllers**: Endpoints da API REST
- **Services**: Lógica de negócio
- **Models**: Entidades de domínio
- **DTOs**: Objetos de transferência de dados
- **Data**: Contexto do banco (Entity Framework)
- **Configurations**: Configurações (JWT)

### Mobile (Ionic + Angular)

**MVVM com Services e Guards**

```
Pages (Views) → Services → API Backend
     ↓
  Models
     ↓
Guards + Interceptors
```

**Camadas:**
- **Pages**: Componentes de UI (Standalone)
- **Services**: Lógica de negócio e HTTP
- **Models**: Interfaces TypeScript
- **Guards**: Proteção de rotas
- **Interceptors**: Injeção de token JWT

---

## 📦 Requisitos e Pacotes

### Backend

**Requisitos:**
- .NET SDK 6.0 ou superior (testado com .NET 10.0.101)
- Homebrew (para macOS)

**Pacotes NuGet:**
```bash
Microsoft.EntityFrameworkCore.Sqlite (10.0.2)
Microsoft.EntityFrameworkCore.Tools (10.0.2)
Microsoft.AspNetCore.Authentication.JwtBearer (10.0.2)
BCrypt.Net-Next (4.0.3)
Swashbuckle.AspNetCore (6.5.0)
```

### Mobile

**Requisitos:**
- Node.js v16+ (testado com v25.4.0)
- npm 7+
- Ionic CLI 7+

**Pacotes npm:**
```bash
@ionic/angular (8.x)
@ionic/storage-angular (4.x)
@angular/core (19.x)
rxjs (7.x)
```

---

## 🗄️ Banco de Dados

**Tipo**: SQLite  
**Arquivo**: `backend/DeloitteAPI/deloitte.db` (criado automaticamente)  
**Connection String**: `Data Source=deloitte.db`

**Tabelas:**
- `Usuarios` - Autenticação
- `Equipamentos` - Cadastro de equipamentos
- `OrdensServico` - Ordens de serviço

**Seed Automático:**
- Usuário admin criado na primeira execução

---

## 🚀 Como Executar

### 1. Backend (.NET API)

```bash
# Navegar para o diretório do backend
cd backend/DeloitteAPI

# Restaurar dependências (opcional, feito automaticamente no build)
dotnet restore

# Executar a API
dotnet run
```

**API estará disponível em:**
- HTTP: `http://localhost:5086`
- Swagger: `http://localhost:5086/swagger`

### 2. Mobile (Ionic + Angular)

```bash
# Navegar para o diretório do mobile
cd mobile

# Instalar dependências (apenas na primeira vez)
npm install

# Executar em modo desenvolvimento
ionic serve
```

**App estará disponível em:**
- Browser: `http://localhost:8100`

---

## 🔑 Autenticação JWT

### Configuração (Backend)

**appsettings.json:**
```json
{
  "JwtSettings": {
    "SecretKey": "deloitte-super-secret-key-with-at-least-32-characters-for-security",
    "Issuer": "deloitte-api",
    "Audience": "deloitte-mobile",
    "ExpirationHours": 24
  }
}
```

### Fluxo de Autenticação

1. **Login**: `POST /api/auth/login` → Retorna token JWT
2. **Storage**: Token salvo localmente no app mobile
3. **Interceptor**: Token injetado automaticamente em todas as requisições
4. **Guard**: Rotas protegidas verificam presença do token
5. **Logout**: Token removido do storage

---

## 📱 Funcionalidades do Mobile

### Telas Implementadas

1. **Login**
   - Formulário reativo com validações
   - Autenticação via API
   - Redirecionamento automático

2. **Dashboard**
   - Resumo de OS (abertas/finalizadas)
   - Navegação para módulos
   - Botão de logout

3. **Lista de Ordens de Serviço**
   - Filtros por status (Todas/Abertas/Finalizadas)
   - Busca por descrição ou equipamento
   - Pull-to-refresh

4. **Detalhes da Ordem de Serviço**
   - Informações completas da OS
   - Equipamento relacionado
   - Botão para finalizar (se aberta)

5. **Lista de Equipamentos**
   - Listagem de todos os equipamentos
   - Busca por nome ou descrição
   - Status (Ativo/Inativo)

### Recursos

- ✅ Design responsivo (mobile, tablet, desktop)
- ✅ Persistência de sessão (Ionic Storage)
- ✅ HTTP Interceptor (Bearer token automático)
- ✅ Route Guards (proteção de rotas)
- ✅ Pull-to-refresh
- ✅ Busca e filtros em tempo real

---

## 🧪 Testando a Aplicação

### 1. Testar Backend via Swagger

1. Acessar `http://localhost:5086/swagger`
2. Testar `POST /api/auth/login` com credenciais `admin`/`admin123`
3. Copiar o token retornado
4. Clicar em **Authorize** e inserir `Bearer {token}`
5. Testar endpoints protegidos

### 2. Testar Mobile

1. Abrir `http://localhost:8100`
2. Fazer login com `admin`/`admin123`
3. Navegar pelo dashboard
4. Criar/visualizar ordens de serviço
5. Visualizar equipamentos
6. Testar logout

---

## 📂 Estrutura do Projeto

```
ionic_deloitte/
├── backend/
│   └── DeloitteAPI/
│       ├── Controllers/
│       ├── Services/
│       ├── Models/
│       ├── DTOs/
│       ├── Data/
│       ├── Configurations/
│       ├── Program.cs
│       └── appsettings.json
├── mobile/
│   └── src/
│       └── app/
│           ├── pages/
│           │   ├── login/
│           │   ├── dashboard/
│           │   ├── ordem-servico/
│           │   └── equipamentos/
│           ├── services/
│           ├── models/
│           ├── guards/
│           ├── interceptors/
│           └── app.routes.ts
└── README.md
```

---

## 🛠️ Comandos Úteis

### Backend

```bash
# Build
dotnet build

# Executar
dotnet run

# Limpar
dotnet clean

# Listar pacotes
dotnet list package
```

### Mobile

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
ionic serve

# Build para produção
ionic build

# Gerar nova página
ionic generate page pages/nome-da-pagina

# Gerar service
ionic generate service services/nome-do-service
```

---

## 📝 Endpoints da API

### Autenticação
- `POST /api/auth/login` - Login e geração de token

### Equipamentos (Protegido)
- `GET /api/equipamentos` - Listar todos
- `GET /api/equipamentos/{id}` - Obter por ID
- `POST /api/equipamentos` - Criar novo
- `PUT /api/equipamentos/{id}` - Atualizar
- `DELETE /api/equipamentos/{id}` - Remover

### Ordens de Serviço (Protegido)
- `GET /api/ordens-servico` - Listar todas
- `GET /api/ordens-servico/{id}` - Obter por ID
- `POST /api/ordens-servico` - Criar nova
- `PATCH /api/ordens-servico/{id}/finalizar` - Finalizar OS

---

## 🎨 Tecnologias Utilizadas

### Backend
- .NET 10
- Entity Framework Core
- SQLite
- JWT Bearer Authentication
- Swagger/OpenAPI
- BCrypt (hash de senhas)

### Mobile
- Ionic Framework 8
- Angular 19 (Standalone Components)
- TypeScript
- Ionic Storage
- RxJS
- SCSS

---

## 👥 Desenvolvido para

**Deloitte - Desafio Técnico**

Sistema de gestão de equipamentos e ordens de serviço com autenticação JWT.