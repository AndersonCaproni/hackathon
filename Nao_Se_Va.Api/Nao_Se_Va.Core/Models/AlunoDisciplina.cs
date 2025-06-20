using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Nao_Se_Va.Core.Models;

public partial class AlunoDisciplina
{
    public int IdAluno { get; set; }

    public int IdDisciplina { get; set; }

    public DateOnly? DataMatricula { get; set; }

    public virtual Aluno IdAlunoNavigation { get; set; } = null!;

    public virtual Disciplina IdDisciplinaNavigation { get; set; } = null!;
}
