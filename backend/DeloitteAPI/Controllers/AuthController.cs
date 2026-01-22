using Microsoft.AspNetCore.Mvc;
using DeloitteAPI.DTOs;
using DeloitteAPI.Services;

namespace DeloitteAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
    {
        var response = await _authService.LoginAsync(request);

        if (response == null)
            return Unauthorized(new { message = "Credenciais inválidas" });

        return Ok(response);
    }
}
