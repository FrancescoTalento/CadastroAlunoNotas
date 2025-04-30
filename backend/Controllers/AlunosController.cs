using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AlunosController : ControllerBase
{
    private readonly AlunoService _service;

    public AlunosController(AlunoService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> CriarAluno([FromBody] AlunoInput input)
    {
        var result = await _service.CriarAlunoAsync(input);
        return Created($"/api/alunos/{result.Id}", result);
    }

    [HttpGet]
    public async Task<IActionResult> BuscarTodos()
        => Ok(await _service.BuscarTodosAsync());

    [HttpGet("atencao")]
    public async Task<IActionResult> ComFrequenciaBaixa()
        => Ok(await _service.BuscarComFrequenciaBaixaAsync());

    [HttpGet("acimaMedia")]
    public async Task<IActionResult> AcimaMediaTurma()
        => Ok(await _service.BuscarAcimaDaMediaAsync());

    [HttpGet("MediaNota")]
    public async Task<IActionResult> MediaPorDisciplina()
        => Ok(await _service.CalcularMediaPorDisciplinaAsync());

    [HttpPut("{id}")]
    public async Task<IActionResult> AtualizarAluno(int id, [FromBody] AlunoInput input)
    {
        var sucesso = await _service.AtualizarAlunoAsync(id, input);
        return sucesso ? NoContent() : NotFound();
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletarAluno(int id)
    {
        var sucesso = await _service.DeletarAlunoAsync(id);
        return sucesso ? NoContent() : NotFound();
    }

}
