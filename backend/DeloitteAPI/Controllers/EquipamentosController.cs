using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DeloitteAPI.DTOs;
using DeloitteAPI.Services;

namespace DeloitteAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class EquipamentosController : ControllerBase
{
    private readonly IEquipamentoService _equipamentoService;

    public EquipamentosController(IEquipamentoService equipamentoService)
    {
        _equipamentoService = equipamentoService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EquipamentoDto>>> GetAll()
    {
        var equipamentos = await _equipamentoService.GetAllAsync();
        return Ok(equipamentos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<EquipamentoDto>> GetById(int id)
    {
        var equipamento = await _equipamentoService.GetByIdAsync(id);

        if (equipamento == null)
            return NotFound(new { message = "Equipamento não encontrado" });

        return Ok(equipamento);
    }

    [HttpPost]
    public async Task<ActionResult<EquipamentoDto>> Create([FromBody] EquipamentoDto dto)
    {
        var equipamento = await _equipamentoService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = equipamento.Id }, equipamento);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] EquipamentoDto dto)
    {
        var success = await _equipamentoService.UpdateAsync(id, dto);

        if (!success)
            return NotFound(new { message = "Equipamento não encontrado" });

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _equipamentoService.DeleteAsync(id);

        if (!success)
            return NotFound(new { message = "Equipamento não encontrado" });

        return NoContent();
    }
}
