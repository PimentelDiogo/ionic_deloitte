using DeloitteAPI.Models;

namespace DeloitteAPI.DTOs;

public class OrdemServicoDto
{
    public int? Id { get; set; }
    public int EquipamentoId { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public DateTime? DataAbertura { get; set; }
    public DateTime? DataFinalizacao { get; set; }
    public StatusOS Status { get; set; }
    public EquipamentoDto? Equipamento { get; set; }
}
