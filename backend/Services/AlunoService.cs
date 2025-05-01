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

    public async Task<AlunoResumoDto> CriarAlunoAsync(AlunoInput input)
    {
        var estudante = new Estudante
        {
            Nome = input.Nome,
            Frequencia = input.Frequencia,
            Notas = input.Notas.Select(n => new Nota
            {
                DisciplinaId = n.DisciplinaId,
                Valor = n.Valor
            }).ToList()
        };

        _db.Estudantes.Add(estudante);
        await _db.SaveChangesAsync();


        var alunoComDisciplinas = await _db.Estudantes
            .Include(e => e.Notas)
                .ThenInclude(n => n.Disciplina)
            .FirstOrDefaultAsync(e => e.Id == estudante.Id);

        if (alunoComDisciplinas is null)
            throw new Exception("Erro ao carregar aluno após cadastro.");

        var medias = alunoComDisciplinas.Notas
            .GroupBy(n => n.Disciplina.Nome)
            .Select(g => new MediaDisciplinaDto(
                g.Key,
                Math.Round(g.Average(n => (double)n.Valor), 2)
            ))
            .ToList();

        return new AlunoResumoDto(
            alunoComDisciplinas.Id,
            alunoComDisciplinas.Nome,
            alunoComDisciplinas.Frequencia,
            medias
        );
    }


        public async Task<IEnumerable<AlunoResumoDto>> BuscarTodosAsync()
    {
        var alunos = await _db.Estudantes
            .Include(e => e.Notas)
                .ThenInclude(n => n.Disciplina)
            .ToListAsync();

        return alunos.Select(e => new AlunoResumoDto(
            e.Id,
            e.Nome,
            e.Frequencia,
            e.Notas
                .GroupBy(n => n.Disciplina.Nome)
                .Select(g => new MediaDisciplinaDto(
                    g.Key,
                    Math.Round(g.Average(n => (double)n.Valor), 2))
                ).ToList()
        ));
    }



    public async Task<IEnumerable<AlunoFrequenciaDto>> BuscarComFrequenciaBaixaAsync()
    {
        var alunos = await _db.Estudantes
            .Where(e => e.Frequencia < 75m)
            .ToListAsync();

        return alunos.Select(e => new AlunoFrequenciaDto(e.Nome, e.Frequencia));
    }


    public async Task<IEnumerable<AlunoMediaGeralDto>> BuscarAcimaDaMediaAsync()
    {
        var alunos = await _db.Estudantes
            .Include(e => e.Notas)
            .ToListAsync();

        if (!alunos.Any() || alunos.All(e => !e.Notas.Any()))
            return new List<AlunoMediaGeralDto>();

        var mediaTurma = alunos
            .Where(e => e.Notas.Any())
            .Average(e => e.Notas.Average(n => (double)n.Valor));

        return alunos
            .Where(e => e.Notas.Any() && e.Notas.Average(n => (double)n.Valor) > mediaTurma)
            .Select(e => new AlunoMediaGeralDto(
                e.Nome,
                Math.Round(e.Notas.Average(n => (double)n.Valor), 2)
            ));
    }


   public async Task<IEnumerable<object>> CalcularMediaPorDisciplinaAsync()
    {
        var notas = await _db.Notas
            .Include(n => n.Disciplina)
            .Where(n => n.Disciplina != null) // segurança extra
            .ToListAsync();

        if (!notas.Any())
            return new List<object>();

        var mediasPorDisciplina = notas
            .GroupBy(n => n.Disciplina!.Nome)
            .Select(g => new
            {
                Disciplina = g.Key,
                Media = Math.Round(g.Average(n => (double)n.Valor), 2)
            })
            .ToList();

        var mediaGeral = Math.Round(notas.Average(n => (double)n.Valor), 2);

        mediasPorDisciplina.Add(new
        {
            Disciplina = "Média Geral",
            Media = mediaGeral
        });

        return mediasPorDisciplina;
    }



    public async Task<bool> AtualizarAlunoAsync(int id, AlunoInput input)
    {
        var aluno = await _db.Estudantes
            .Include(e => e.Notas)
            .FirstOrDefaultAsync(e => e.Id == id);

        if (aluno == null)
            return false;

        aluno.Nome = input.Nome;
        aluno.Frequencia = input.Frequencia;

        _db.Notas.RemoveRange(aluno.Notas);

        aluno.Notas = input.Notas.Select(n => new Nota
        {
            DisciplinaId = n.DisciplinaId,
            Valor = n.Valor,
            EstudanteId = aluno.Id
        }).ToList();

        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> AtualizarNotasAsync(int id, List<NotaInput> novasNotas)
    {
        var aluno = await _db.Estudantes
            .Include(e => e.Notas)
            .FirstOrDefaultAsync(e => e.Id == id);

        if (aluno == null)
            return false;

        foreach (var novaNota in novasNotas)
        {
            _db.Notas.Add(new Nota
            {
                EstudanteId = aluno.Id,
                DisciplinaId = novaNota.DisciplinaId,
                Valor = novaNota.Valor
            });
        }

        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<object?> BuscarPorIdAsync(int id)
    {
        var aluno = await _db.Estudantes
            .Include(e => e.Notas)
                .ThenInclude(n => n.Disciplina)
            .FirstOrDefaultAsync(e => e.Id == id);

        if (aluno is null) return null;

        return new
        {
            aluno.Id,
            aluno.Nome,
            aluno.Frequencia,
            Notas = aluno.Notas.Select(n => new
            {
                Disciplina = n.Disciplina.Nome,
                n.Valor
            })
        };
    }

    public async Task<bool> DeletarAlunoAsync(int id)
    {
        var aluno = await _db.Estudantes
            .Include(e => e.Notas)
            .FirstOrDefaultAsync(e => e.Id == id);

        if (aluno == null)
            return false;

        _db.Notas.RemoveRange(aluno.Notas);
        _db.Estudantes.Remove(aluno);

        await _db.SaveChangesAsync();
        return true;
    }
}
