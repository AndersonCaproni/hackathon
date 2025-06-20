using Microsoft.EntityFrameworkCore;
using Nao_Se_Va.Core.Infra;
using Nao_Se_Va.Core.Models;

public class GeralRepository
{
    private HackathonDbContext _context;

    public GeralRepository(HackathonDbContext context)
    {
        _context = context;
    }

    public async Task<AlunoResposta1?> ObterAluno(int idAluno)
    {
        var alunoDto = await _context.Alunos
            .AsNoTracking()
            .Include(a => a.AlunoDisciplinas)
                .ThenInclude(ad => ad.IdDisciplinaNavigation)
                    .ThenInclude(d => d.IdProfessorNavigation)
            .Where(a => a.IdAluno == idAluno)
            .Select(aluno => new AlunoResposta1
            {
                IdAluno = aluno.IdAluno,
                Nome = aluno.Nome,
                Cpf = aluno.Cpf,
                Email = aluno.Email,
                Telefone = aluno.Telefone,
                Periodo = aluno.Periodo,
                DataIngresso = aluno.DataIngresso,
                TotalAcessos = aluno.TotalAcessos,
                Media = aluno.Media,
                UltimoAcesso = aluno.UltimoAcesso,
                Disciplinas = aluno.AlunoDisciplinas.Select(ad => new DisciplinaResposta
                {
                    IdDisciplina = ad.IdDisciplinaNavigation.IdDisciplina,
                    Duracao = ad.IdDisciplinaNavigation.Duracao,
                    Nome = ad.IdDisciplinaNavigation.Nome
                }).ToList()
            })
            .FirstOrDefaultAsync();

        return alunoDto;
    }

    public async Task<ProfessorResposta1?> ObterAlunosPorProfessor(int idProfessor)
    {
        var professorDto = await _context.Professors
            .Where(p => p.IdProfessor == idProfessor)
            .Select(professor => new ProfessorResposta1
            {
                IdProfessor = professor.IdProfessor,
                Nome = professor.Nome,
                Email = professor.Email,
                Matricula = professor.Matricula,
                CursoResponsavel = professor.CursoResponsavel,
                Disciplinas = professor.Disciplinas.Select(d => new DisciplinaResposta1
                {
                    IdDisciplina = d.IdDisciplina,
                    Nome = d.Nome,
                    Duracao = d.Duracao,
                    Alunos = d.AlunoDisciplinas.Select(ad => new AlunoResposta
                    {
                        IdAluno = ad.IdAlunoNavigation.IdAluno,
                        Nome = ad.IdAlunoNavigation.Nome,
                        Cpf = ad.IdAlunoNavigation.Cpf,
                        Email = ad.IdAlunoNavigation.Email,
                        Telefone = ad.IdAlunoNavigation.Telefone,
                        Periodo = ad.IdAlunoNavigation.Periodo,
                        DataIngresso = ad.IdAlunoNavigation.DataIngresso,
                        TotalAcessos = ad.IdAlunoNavigation.TotalAcessos,
                        Media = ad.IdAlunoNavigation.Media,
                        UltimoAcesso = ad.IdAlunoNavigation.UltimoAcesso
                    }).ToList()
                }).ToList()
            })
            .FirstOrDefaultAsync();
        return professorDto;
    }

    public async Task<List<AlunoResposta1>> ObterAlunosPorProfessorIdCompleto(int idProfessor)
    {
        var alunosDto = await _context.Alunos
            .AsNoTracking()
            .Where(aluno => aluno.AlunoDisciplinas.Any(ad => ad.IdDisciplinaNavigation.IdProfessor == idProfessor))
            .Select(aluno => new AlunoResposta1
            {
                IdAluno = aluno.IdAluno,
                Nome = aluno.Nome,
                Cpf = aluno.Cpf,
                Email = aluno.Email,
                Telefone = aluno.Telefone,
                Periodo = aluno.Periodo,
                DataIngresso = aluno.DataIngresso,
                TotalAcessos = aluno.TotalAcessos,
                Media = aluno.Media,
                UltimoAcesso = aluno.UltimoAcesso,
                Disciplinas = aluno.AlunoDisciplinas.Select(ad => new DisciplinaResposta
                {
                    IdDisciplina = ad.IdDisciplinaNavigation.IdDisciplina,
                    Duracao = ad.IdDisciplinaNavigation.Duracao,
                    Nome = ad.IdDisciplinaNavigation.Nome
                }).ToList()
            })
            .ToListAsync();

        return alunosDto;
    }

    public async Task<List<AlunoResposta2>> ObterAlunosPorProfessorId(int idProfessor)
    {
        return await _context.AlunoDisciplinas
            .AsNoTracking()
            .Where(ad => ad.IdDisciplinaNavigation.IdProfessor == idProfessor)
            .Select(ad => new AlunoResposta2
            {
                IdAluno = ad.IdAlunoNavigation.IdAluno,
                Nome = ad.IdAlunoNavigation.Nome,
                Cpf = ad.IdAlunoNavigation.Cpf,
                Email = ad.IdAlunoNavigation.Email,
                Telefone = ad.IdAlunoNavigation.Telefone,
                Periodo = ad.IdAlunoNavigation.Periodo,
                DataIngresso = ad.IdAlunoNavigation.DataIngresso,
                TotalAcessos = ad.IdAlunoNavigation.TotalAcessos,
                Media = ad.IdAlunoNavigation.Media,
                UltimoAcesso = ad.IdAlunoNavigation.UltimoAcesso,
                Disciplina = ad.IdDisciplinaNavigation.Nome
            })
            .ToListAsync();
    }

    public async Task<DisciplinaResposta1?> ObterAlunosPorDisciplina(int idDisciplina)
    {
        var disciplinaComAlunosDto = await _context.Disciplinas
            .Where(d => d.IdDisciplina == idDisciplina)
            .Select(disciplina => new DisciplinaResposta1
            {
                IdDisciplina = disciplina.IdDisciplina,
                Nome = disciplina.Nome,
                Duracao = disciplina.Duracao,
                Alunos = disciplina.AlunoDisciplinas
                    .Select(ad => new AlunoResposta
                    {
                        IdAluno = ad.IdAlunoNavigation.IdAluno,
                        Nome = ad.IdAlunoNavigation.Nome,
                        Cpf = ad.IdAlunoNavigation.Cpf,
                        Email = ad.IdAlunoNavigation.Email,
                        Telefone = ad.IdAlunoNavigation.Telefone,
                        Periodo = ad.IdAlunoNavigation.Periodo,
                        DataIngresso = ad.IdAlunoNavigation.DataIngresso,
                        TotalAcessos = ad.IdAlunoNavigation.TotalAcessos,
                        Media = ad.IdAlunoNavigation.Media,
                        UltimoAcesso = ad.IdAlunoNavigation.UltimoAcesso
                    }).ToList()
            })
            .FirstOrDefaultAsync();

        return disciplinaComAlunosDto;
    }

    public async Task<ProfessorResposta?> ObterProfessor(int id)
    {
        var professorDto = await _context.Professors
            .Where(p => p.IdProfessor == id)
            .Select(p => new ProfessorResposta
            {
                IdProfessor = p.IdProfessor,
                Nome = p.Nome,
                Email = p.Email,
                Matricula = p.Matricula,
                CursoResponsavel = p.CursoResponsavel,
                Disciplinas = p.Disciplinas.Select(d => new DisciplinaResposta
                {
                    IdDisciplina = d.IdDisciplina,
                    Nome = d.Nome,
                    Duracao = d.Duracao
                }).ToList()
            })
            .FirstOrDefaultAsync();

        return professorDto;
    }

    public async Task<ProfessorResposta?> logar(string email, string senha)
    {
        var professorDto = await _context.Professors
            .Where(d => d.Email == email && d.Senha == senha)
            .Select(p => new ProfessorResposta
            {
                IdProfessor = p.IdProfessor,
                Nome = p.Nome,
                Email = p.Email,
                Matricula = p.Matricula,
                CursoResponsavel = p.CursoResponsavel,
                Disciplinas = p.Disciplinas.Select(d => new DisciplinaResposta
                {
                    IdDisciplina = d.IdDisciplina,
                    Nome = d.Nome,
                    Duracao = d.Duracao
                }).ToList()
            })
            .FirstOrDefaultAsync();

        return professorDto;
    }

}