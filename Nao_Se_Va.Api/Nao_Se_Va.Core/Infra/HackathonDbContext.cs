using Microsoft.EntityFrameworkCore;
using Nao_Se_Va.Core.Models;

namespace Nao_Se_Va.Core.Infra;

public partial class HackathonDbContext : DbContext
{
    private string _stringConexao = "Server=NOTE159\\SQLEXPRESS;Database=hackathon;Trusted_Connection=True;TrustServerCertificate=True;";
    public HackathonDbContext()
    {
    }

    public HackathonDbContext(DbContextOptions<HackathonDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Aluno> Alunos { get; set; }

    public virtual DbSet<AlunoDisciplina> AlunoDisciplinas { get; set; }

    public virtual DbSet<Disciplina> Disciplinas { get; set; }

    public virtual DbSet<Professor> Professors { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
            optionsBuilder.UseSqlServer(_stringConexao);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Aluno>(entity =>
        {
            entity.HasKey(e => e.IdAluno).HasName("PK__Aluno__0C5BC8492AA07FE2");

            entity.ToTable("Aluno");

            entity.HasIndex(e => e.Email, "UQ__Aluno__AB6E6164D4B8AFFA").IsUnique();

            entity.HasIndex(e => e.Cpf, "UQ__Aluno__D836E71F3F212DD0").IsUnique();

            entity.Property(e => e.IdAluno).HasColumnName("idAluno");
            entity.Property(e => e.Ativo)
                .HasDefaultValue(true)
                .HasColumnName("ativo");
            entity.Property(e => e.AtualizadoEm)
                .HasColumnType("datetime")
                .HasColumnName("atualizado_em");
            entity.Property(e => e.Cpf)
                .HasMaxLength(11)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("cpf");
            entity.Property(e => e.CriadoEm)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("criado_em");
            entity.Property(e => e.DataIngresso).HasColumnName("dataIngresso");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Media)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("media");
            entity.Property(e => e.Nome)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nome");
            entity.Property(e => e.Periodo).HasColumnName("periodo");
            entity.Property(e => e.Senha)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("senha");
            entity.Property(e => e.Telefone)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("telefone");
            entity.Property(e => e.TotalAcessos)
                .HasDefaultValue(0)
                .HasColumnName("totalAcessos");
            entity.Property(e => e.UltimoAcesso)
                .HasColumnType("datetime")
                .HasColumnName("ultimoAcesso");
        });
        
        modelBuilder.Entity<AlunoDisciplina>(entity =>
        {
            entity.HasKey(e => new { e.IdAluno, e.IdDisciplina }).HasName("PK__AlunoDis__E5733D47C4118254");

            entity.ToTable("AlunoDisciplina");

            entity.Property(e => e.IdAluno).HasColumnName("idAluno");
            entity.Property(e => e.IdDisciplina).HasColumnName("idDisciplina");
            entity.Property(e => e.DataMatricula)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("dataMatricula");

            entity.HasOne(d => d.IdAlunoNavigation).WithMany(p => p.AlunoDisciplinas)
                .HasForeignKey(d => d.IdAluno)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__AlunoDisc__idAlu__68487DD7");

            entity.HasOne(d => d.IdDisciplinaNavigation).WithMany(p => p.AlunoDisciplinas)
                .HasForeignKey(d => d.IdDisciplina)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__AlunoDisc__idDis__693CA210");
        });

        modelBuilder.Entity<Disciplina>(entity =>
        {
            entity.HasKey(e => e.IdDisciplina).HasName("PK__Discipli__928F50EF364A99FC");

            entity.ToTable("Disciplina");

            entity.Property(e => e.IdDisciplina).HasColumnName("idDisciplina");
            entity.Property(e => e.Duracao).HasColumnName("duracao");
            entity.Property(e => e.IdProfessor).HasColumnName("idProfessor");
            entity.Property(e => e.Nome)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nome");

            entity.HasOne(d => d.IdProfessorNavigation).WithMany(p => p.Disciplinas)
                .HasForeignKey(d => d.IdProfessor)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Disciplin__idPro__60A75C0F");
        });

        modelBuilder.Entity<Professor>(entity =>
        {
            entity.HasKey(e => e.IdProfessor).HasName("PK__Professo__4E7C3C6D38988A1C");

            entity.ToTable("Professor");

            entity.HasIndex(e => e.Matricula, "UQ__Professo__30962D158687D03B").IsUnique();

            entity.HasIndex(e => e.Email, "UQ__Professo__AB6E61647ACF42F1").IsUnique();

            entity.Property(e => e.IdProfessor).HasColumnName("idProfessor");
            entity.Property(e => e.CursoResponsavel)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("cursoResponsavel");
            entity.Property(e => e.DataAdmissao).HasColumnName("dataAdmissao");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Matricula)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("matricula");
            entity.Property(e => e.Nome)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nome");
            entity.Property(e => e.Senha)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("senha");
            entity.Property(e => e.Token)
                .IsUnicode(false)
                .HasColumnName("token");
            entity.Property(e => e.UltimoAcesso)
                .HasColumnType("datetime")
                .HasColumnName("ultimoAcesso");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
