using DeloitteAPI.DTOs;

namespace DeloitteAPI.Services;

public interface IEquipamentoService
{
    Task<IEnumerable<EquipamentoDto>> GetAllAsync();
    Task<EquipamentoDto?> GetByIdAsync(int id);
    Task<EquipamentoDto> CreateAsync(EquipamentoDto dto);
    Task<bool> UpdateAsync(int id, EquipamentoDto dto);
    Task<bool> DeleteAsync(int id);
}
