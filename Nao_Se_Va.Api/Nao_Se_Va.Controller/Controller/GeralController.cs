using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class GeralController : ControllerBase
{
    private GeralRepository _repository;

    public GeralController(GeralRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    [Route("ObterAlunosPorProfessorId/{id}")]
    public async Task<ActionResult> ObterAlunosPorProfessorId([FromRoute] int id)
    {
        try
        {
            return Ok(await _repository.ObterAlunosPorProfessorId(id));
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpGet]
    [Route("ObterAlunosPorProfessorIdCompleto/{id}")]
    public async Task<ActionResult> ObterAlunosPorProfessorIdCompleto([FromRoute] int id)
    {
        try
        {
            return Ok(await _repository.ObterAlunosPorProfessorIdCompleto(id));
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpGet]
    [Route("ObterAlunos/{id}")]
    public async Task<ActionResult> Obteraluno([FromRoute] int id)
    {
        try
        {
            return Ok(await _repository.ObterAluno(id));
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpGet]
    [Route("ObterAlunosPorProfessor/{id}")]
    public async Task<ActionResult> ObterAlunosPorProfessor([FromRoute] int id)
    {
        try
        {
            return Ok(await _repository.ObterAlunosPorProfessor(id));
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpGet]
    [Route("ObterAlunosPorDisciplina/{id}")]
    public async Task<ActionResult> ObterAlunosPorDisciplina([FromRoute] int id)
    {
        try
        {
            return Ok(await _repository.ObterAlunosPorDisciplina(id));
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpGet]
    [Route("ObterProfessor/{id}")]
    public async Task<ActionResult> ObterProfessor([FromRoute] int id)
    {
        try
        {
            return Ok(await _repository.ObterProfessor(id));
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpPost]
    [Route("Logar")]
    public async Task<ActionResult> Logar([FromBody] Login info)
    {
        try
        {
            var resultadoLogin = await _repository.logar(info.Email, info.Senha);

            if (resultadoLogin == null)
            {
                return Unauthorized("Email ou senha inválidos.");
            }

            return Ok(resultadoLogin);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Ocorreu um erro interno: " + ex.Message);
        }
    }
}

public class Login
{
    public string Email { get; set; }
    public string Senha { get; set; }
}