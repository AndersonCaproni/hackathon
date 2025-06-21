public class AlunoResposta
{
    public int IdAluno { get; set; }

    public string Nome { get; set; } = null!;

    public string? Cpf { get; set; }

    public string Email { get; set; } = null!;

    public string? Telefone { get; set; }

    public int? Periodo { get; set; }

    public DateOnly? DataIngresso { get; set; }
    public string Matricula { get; set; } = null!;

    public int? TotalAcessos { get; set; }

    public decimal? Media { get; set; }

    public DateTime? UltimoAcesso { get; set; }

}