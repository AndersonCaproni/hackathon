using System;
using System.Collections.Generic;

namespace Nao_Se_Va.Core.Models;

public partial class Professor
{
    public int IdProfessor { get; set; }

    public string Nome { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Matricula { get; set; } = null!;

    public string Senha { get; set; } = null!;

    public string? CursoResponsavel { get; set; }

    public DateOnly? DataAdmissao { get; set; }

    public DateTime? UltimoAcesso { get; set; }

    public string? Token { get; set; }

    public virtual ICollection<Disciplina> Disciplinas { get; set; } = new List<Disciplina>();
}
