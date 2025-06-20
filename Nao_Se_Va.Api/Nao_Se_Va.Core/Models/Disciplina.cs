using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Nao_Se_Va.Core.Models;

public partial class Disciplina
{
    public int IdDisciplina { get; set; }

    public string Nome { get; set; } = null!;

    public int Duracao { get; set; }

    public int IdProfessor { get; set; }

    public virtual ICollection<AlunoDisciplina> AlunoDisciplinas { get; set; } = new List<AlunoDisciplina>();

    public virtual Professor IdProfessorNavigation { get; set; } = null!;
}
