namespace DeloitteAPI.Models;

public enum StatusOS
{
    Aberta,
    Finalizada
}

public class OrdemServico
{
    public int Id { get; set; }
    public int EquipamentoId { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public DateTime DataAbertura { get; set; } = DateTime.UtcNow;
    public DateTime? DataFinalizacao { get; set; }
    public StatusOS Status { get; set; } = StatusOS.Aberta;
    
    public Equipamento? Equipamento { get; set; }
}
