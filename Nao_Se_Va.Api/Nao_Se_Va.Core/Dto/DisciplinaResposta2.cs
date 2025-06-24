public partial class DisciplinaResposta2
{
    public int IdDisciplina { get; set; }

    public string Nome { get; set; } = null!;

    public int Duracao { get; set; }

    public ICollection<AlunoResposta3> Alunos { get; set; }
}
