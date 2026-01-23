using Microsoft.EntityFrameworkCore;
using DeloitteAPI.Data;
using DeloitteAPI.DTOs;
using DeloitteAPI.Models;

namespace DeloitteAPI.Services;

public class EquipamentoService : IEquipamentoService{
    private readonly AppDbContext _context;

    public EquipamentoService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<EquipamentoDto>> GetAllAsync()
    {
        var equipamentos = await _context.Equipamentos.ToListAsync();
        return equipamentos.Select(MapToDto);
    }

    public async Task<EquipamentoDto?> GetByIdAsync(int id)
    {
        var equipamento = await _context.Equipamentos.FindAsync(id);
        return equipamento == null ? null : MapToDto(equipamento);
    }

    public async Task<EquipamentoDto> CreateAsync(EquipamentoDto dto)
    {
        var equipamento = new Equipamento
        {
            Nome = dto.Nome,
            Descricao = dto.Descricao,
            Ativo = dto.Ativo,
            DataCadastro = DateTime.UtcNow
        };

        _context.Equipamentos.Add(equipamento);
        await _context.SaveChangesAsync();

        return MapToDto(equipamento);
    }

    public async Task<bool> UpdateAsync(int id, EquipamentoDto dto)
    {
        var equipamento = await _context.Equipamentos.FindAsync(id);
        if (equipamento == null)
            return false;

        equipamento.Nome = dto.Nome;
        equipamento.Descricao = dto.Descricao;
        equipamento.Ativo = dto.Ativo;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var equipamento = await _context.Equipamentos.FindAsync(id);
        if (equipamento == null)
            return false;

        _context.Equipamentos.Remove(equipamento);
        await _context.SaveChangesAsync();
        return true;
    }

    private static EquipamentoDto MapToDto(Equipamento equipamento)
    {
        return new EquipamentoDto
        {
            Id = equipamento.Id,
            Nome = equipamento.Nome,
            Descricao = equipamento.Descricao,
            DataCadastro = equipamento.DataCadastro,
            Ativo = equipamento.Ativo
        };
    }
}
