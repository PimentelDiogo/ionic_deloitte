using DeloitteAPI.DTOs;

namespace DeloitteAPI.Services;

public interface IAuthService
{
    Task<LoginResponse?> LoginAsync(LoginRequest request);
}
