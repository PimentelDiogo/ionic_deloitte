using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DeloitteAPI.DTOs;
using DeloitteAPI.Services;

namespace DeloitteAPI.Controllers;

[ApiController]
[Route("api/ordens-servico")]
[Authorize]
public class OrdensServicoController : ControllerBase
{
    private readonly IOrdemServicoService _ordemServicoService;

    public OrdensServicoController(IOrdemServicoService ordemServicoService)
    {
        _ordemServicoService = ordemServicoService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<OrdemServicoDto>>> GetAll()
    {
        var ordensServico = await _ordemServicoService.GetAllAsync();
        return Ok(ordensServico);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OrdemServicoDto>> GetById(int id)
    {
        var ordemServico = await _ordemServicoService.GetByIdAsync(id);

        if (ordemServico == null)
            return NotFound(new { message = "Ordem de serviço não encontrada" });

        return Ok(ordemServico);
    }

    [HttpPost]
    public async Task<ActionResult<OrdemServicoDto>> Create([FromBody] OrdemServicoDto dto)
    {
        var ordemServico = await _ordemServicoService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = ordemServico.Id }, ordemServico);
    }

    [HttpPatch("{id}/finalizar")]
    public async Task<IActionResult> Finalizar(int id)
    {
        var success = await _ordemServicoService.FinalizarAsync(id);

        if (!success)
            return NotFound(new { message = "Ordem de serviço não encontrada ou já finalizada" });

        return Ok(new { message = "Ordem de serviço finalizada com sucesso" });
    }
}
