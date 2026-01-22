namespace DeloitteAPI.Models;

public class Equipamento
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public DateTime DataCadastro { get; set; } = DateTime.UtcNow;
    public bool Ativo { get; set; } = true;
    
    public ICollection<OrdemServico> OrdensServico { get; set; } = new List<OrdemServico>();
}
