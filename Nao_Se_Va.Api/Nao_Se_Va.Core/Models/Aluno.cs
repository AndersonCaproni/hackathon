using System;
using System.Collections.Generic;

namespace Nao_Se_Va.Core.Models;

public partial class Aluno
{
    public int IdAluno { get; set; }

    public string Nome { get; set; } = null!;

    public string? Cpf { get; set; }

    public string Email { get; set; } = null!;

    public string Senha { get; set; } = null!;

    public string? Telefone { get; set; }

    public int? Periodo { get; set; }

    public DateOnly? DataIngresso { get; set; }

    public int? TotalAcessos { get; set; }

    public decimal? Media { get; set; }

    public DateTime? UltimoAcesso { get; set; }

    public bool? Ativo { get; set; }

    public DateTime? CriadoEm { get; set; }

    public DateTime? AtualizadoEm { get; set; }

    public virtual ICollection<AlunoDisciplina> AlunoDisciplinas { get; set; } = new List<AlunoDisciplina>();
}
