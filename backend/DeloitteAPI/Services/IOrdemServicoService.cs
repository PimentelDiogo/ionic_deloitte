using DeloitteAPI.DTOs;

namespace DeloitteAPI.Services;

public interface IOrdemServicoService
{
    Task<IEnumerable<OrdemServicoDto>> GetAllAsync();
    Task<OrdemServicoDto?> GetByIdAsync(int id);
    Task<OrdemServicoDto> CreateAsync(OrdemServicoDto dto);
    Task<bool> FinalizarAsync(int id);
}
