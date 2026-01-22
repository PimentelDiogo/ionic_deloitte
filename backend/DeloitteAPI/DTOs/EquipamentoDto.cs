namespace DeloitteAPI.DTOs;

public class EquipamentoDto
{
    public int? Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public DateTime? DataCadastro { get; set; }
    public bool Ativo { get; set; } = true;
}
