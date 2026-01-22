using Microsoft.EntityFrameworkCore;
using DeloitteAPI.Data;
using DeloitteAPI.DTOs;
using DeloitteAPI.Models;

namespace DeloitteAPI.Services;

public class OrdemServicoService : IOrdemServicoService
{
    private readonly AppDbContext _context;

    public OrdemServicoService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<OrdemServicoDto>> GetAllAsync()
    {
        var ordensServico = await _context.OrdensServico
            .Include(os => os.Equipamento)
            .ToListAsync();

        return ordensServico.Select(MapToDto);
    }

    public async Task<OrdemServicoDto?> GetByIdAsync(int id)
    {
        var ordemServico = await _context.OrdensServico
            .Include(os => os.Equipamento)
            .FirstOrDefaultAsync(os => os.Id == id);

        return ordemServico == null ? null : MapToDto(ordemServico);
    }

    public async Task<OrdemServicoDto> CreateAsync(OrdemServicoDto dto)
    {
        var ordemServico = new OrdemServico
        {
            EquipamentoId = dto.EquipamentoId,
            Descricao = dto.Descricao,
            DataAbertura = DateTime.UtcNow,
            Status = StatusOS.Aberta
        };

        _context.OrdensServico.Add(ordemServico);
        await _context.SaveChangesAsync();

        // Recarregar com equipamento
        await _context.Entry(ordemServico)
            .Reference(os => os.Equipamento)
            .LoadAsync();

        return MapToDto(ordemServico);
    }

    public async Task<bool> FinalizarAsync(int id)
    {
        var ordemServico = await _context.OrdensServico.FindAsync(id);
        if (ordemServico == null || ordemServico.Status == StatusOS.Finalizada)
            return false;

        ordemServico.Status = StatusOS.Finalizada;
        ordemServico.DataFinalizacao = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return true;
    }

    private static OrdemServicoDto MapToDto(OrdemServico ordemServico)
    {
        return new OrdemServicoDto
        {
            Id = ordemServico.Id,
            EquipamentoId = ordemServico.EquipamentoId,
            Descricao = ordemServico.Descricao,
            DataAbertura = ordemServico.DataAbertura,
            DataFinalizacao = ordemServico.DataFinalizacao,
            Status = ordemServico.Status,
            Equipamento = ordemServico.Equipamento == null ? null : new EquipamentoDto
            {
                Id = ordemServico.Equipamento.Id,
                Nome = ordemServico.Equipamento.Nome,
                Descricao = ordemServico.Equipamento.Descricao,
                DataCadastro = ordemServico.Equipamento.DataCadastro,
                Ativo = ordemServico.Equipamento.Ativo
            }
        };
    }
}
