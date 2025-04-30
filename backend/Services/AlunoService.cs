using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class AlunoService
{
    private readonly AppDbContext _db;

    public AlunoService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<AlunoOutput> CriarAlunoAsync(AlunoInput input)
{
    var estudante = new Estudante
    {
        Nome = input.Nome,
        Frequencia = input.Frequencia,
        Notas = input.Notas.Select(n => new Nota
        {
            Disciplina = n.Disciplina,
            Valor = n.Valor
        }).ToList()
    };

    _db.Estudantes.Add(estudante);
    await _db.SaveChangesAsync();

    var media = Math.Round(estudante.Notas.Average(n => (double)n.Valor), 2);

    return new AlunoOutput(
        estudante.Id,
        estudante.Nome,
        estudante.Frequencia,
        media
    );
}

    public async Task<IEnumerable<object>> BuscarTodosAsync()
    {
        var alunos = await _db.Estudantes.Include(e => e.Notas).ToListAsync();

        return alunos.Select(e => new
        {
            e.Id,
            e.Nome,
            e.Frequencia,
            MediasPorDisciplina = e.Notas.GroupBy(n => n.Disciplina)
                .Select(g => new { Disciplina = g.Key, Media = Math.Round(g.Average(n => (double)n.Valor), 2) }),
            Notas = e.Notas.Select(n => new { n.Disciplina, n.Valor })
        });
    }

    public async Task<IEnumerable<object>> BuscarComFrequenciaBaixaAsync()
    {
        var alunos = await _db.Estudantes
            .Include(e => e.Notas)
            .Where(e => e.Frequencia < 75m)
            .ToListAsync();

        return alunos.Select(e => new
        {
            e.Id,
            e.Nome,
            e.Frequencia,
            MediaAluno = Math.Round(e.Notas.Any() ? e.Notas.Average(n => (double)n.Valor) : 0, 2),
            Notas = e.Notas.Select(n => new { n.Disciplina, n.Valor })
        });
    }

    public async Task<IEnumerable<object>> BuscarAcimaDaMediaAsync()
    {
        var alunos = await _db.Estudantes.Include(e => e.Notas).ToListAsync();

        if (!alunos.Any() || alunos.All(e => !e.Notas.Any()))
            return new List<object>();

        var mediaTurma = alunos
            .Where(e => e.Notas.Any())
            .Average(e => e.Notas.Average(n => (double)n.Valor));

        return alunos
            .Where(e => e.Notas.Any() && e.Notas.Average(n => (double)n.Valor) > mediaTurma)
            .Select(e => new
            {
                e.Id,
                e.Nome,
                e.Frequencia,
                MediaAluno = Math.Round(e.Notas.Average(n => (double)n.Valor), 2),
                MediaTurma = Math.Round(mediaTurma, 2),
                Notas = e.Notas.Select(n => new { n.Disciplina, n.Valor })
            });
    }

    public async Task<IEnumerable<object>> CalcularMediaPorDisciplinaAsync()
    {
        return await _db.Notas
            .GroupBy(n => n.Disciplina)
            .Select(g => new
            {
                Disciplina = g.Key,
                Media = Math.Round(g.Average(n => (double)n.Valor), 2)
            }).ToListAsync();
    }
}
