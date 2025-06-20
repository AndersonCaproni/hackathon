public partial class DisciplinaResposta1
{
    public int IdDisciplina { get; set; }

    public string Nome { get; set; } = null!;

    public int Duracao { get; set; }
    public ICollection<AlunoResposta> Alunos { get; set; }
}
