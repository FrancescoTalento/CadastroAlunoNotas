using backend.Data; 
using backend.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Le a connection string do appsettings.json
var connectionString = builder.Configuration.GetConnectionString("MySql");

// Registra o AppDbContext com o MySQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

var app = builder.Build();

//Cria o banco e as tabelas se não existirem
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate(); 
}

app.UseCors();
app.UseHttpsRedirection();

// Metodos da API

// ADD Estudantes no DB 
app.MapPost("/api/alunos", async (AlunoInput input, backend.Data.AppDbContext db) =>
{
    var estudante = new Estudante
    {
        Nome = input.Nome,
        Frequencia = input.Frequencia,
        Notas = input.Notas.Select(n => new Nota
        {
            Disciplina = n.Disciplina,
            Valor = n.Valor, 2 
        }).ToList()
    };

    db.Estudantes.Add(estudante);
    await db.SaveChangesAsync();

    var media = Math.Round(estudante.Notas.Average(n => n.Valor), 2);

    return Results.Created($"/api/alunos/{estudante.Id}", new
    {
        estudante.Id,
        estudante.Nome,
        estudante.Frequencia,
        Media = media
    });
});



//Busca todos os estudantes do DB
app.MapGet("/api/alunos", async (AppDbContext db) =>
{
    var alunos = await db.Estudantes
        .Include(e => e.Notas)
        .ToListAsync();

    var resultado = alunos.Select(e => new
    {
        e.Id,
        e.Nome,
        e.Frequencia,
        Media = Math.Round(e.Notas.Any() ? e.Notas.Average(n => (double)n.Valor) : 0, 2),
        Notas = e.Notas.Select(n => new
        {
            n.Disciplina,
            n.Valor
        })
    });

    return Results.Ok(resultado);
});


// Alunos que necessitam de atencao
app.MapGet("/api/alunos/atencao", async (AppDbContext db) =>
{
    var alunos = await db.Estudantes
        .Include(e => e.Notas)
        .Where(e => e.Frequencia < 75)
        .ToListAsync();

    var resultado = alunos.Select(e => new
    {
        e.Id,
        e.Nome,
        e.Frequencia,
        MediaAluno = Math.Round(e.Notas.Any() ? e.Notas.Average(n => (double)n.Valor) : 0, 2),
        Notas = e.Notas.Select(n => new
        {
            n.Disciplina,
            n.Valor
        })
    });

    return Results.Ok(resultado);
});

// Alunos com média acima da média da turma
app.MapGet("/api/alunos/acimaMedia", async (AppDbContext db) =>
{
    var alunos = await db.Estudantes
        .Include(e => e.Notas)
        .ToListAsync();

    if (!alunos.Any() || alunos.All(e => !e.Notas.Any()))
        return Results.Ok(new List<object>());

    // Calcula a média geral da turma considerando todas as notas
    var mediaTurma = alunos
        .Where(e => e.Notas.Any())
        .Average(e => e.Notas.Average(n => (double)n.Valor));

    var acimaMedia = alunos
        .Where(e => e.Notas.Any() && e.Notas.Average(n => (double)n.Valor) > mediaTurma)
        .Select(e => new
        {
            e.Id, // equivale a id_estudante
            e.Nome, // equivale a nome
            e.Frequencia, // equivale a frequencia
            MediaAluno = Math.Round(e.Notas.Average(n => (double)n.Valor), 2),
            MediaTurma = Math.Round(mediaTurma, 2),
            Notas = e.Notas.Select(n => new
            {
                n.Disciplina,
                n.Valor // equivale a valor_nota
            })
        });

    return Results.Ok(acimaMedia);
});
// Média da turma por disciplina
app.MapGet("/api/alunos/MediaNota", async (AppDbContext db) =>
{
    var mediasPorDisciplina = await db.Notas
        .GroupBy(n => n.Disciplina)
        .Select(g => new
        {
            Disciplina = g.Key,
            Media = Math.Round(g.Average(n => (double)n.Valor), 2)
        })
        .ToListAsync();

    return Results.Ok(mediasPorDisciplina);
});

app.Run();
