public class ProfessorResposta1
{
    
    public int IdProfessor { get; set; }

    public string Nome { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Matricula { get; set; } = null!;

    public string? CursoResponsavel { get; set; }

    public virtual ICollection<DisciplinaResposta1> Disciplinas { get; set; }
}