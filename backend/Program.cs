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
            Valor = n.Valor
        }).ToList()
    };

    db.Estudantes.Add(estudante);
    await db.SaveChangesAsync();

    return Results.Created($"/api/alunos/{estudante.Id}", new
    {
        estudante.Id,
        estudante.Nome,
        estudante.Frequencia,
        Media = estudante.Notas.Average(n => (double)n.Valor)
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
    // Busca todos os estudantes com notas
    var alunos = await db.Estudantes
        .Include(e => e.Notas)
        .ToListAsync();

    if (!alunos.Any()) return Results.Ok(new List<object>());

    // Calcula a média da turma 
    var mediaTurma = alunos
        .Where(e => e.Notas.Any())
        .Average(e => e.Notas.Average(n => (double)n.Valor));

    // Filtra os alunos em atencao
    var atencao = alunos.Where(e =>
    {
        var mediaAluno = e.Notas.Any() ? e.Notas.Average(n => (double)n.Valor) : 0;
        return mediaAluno < mediaTurma || e.Frequencia < 75;
    });

    var resultado = atencao.Select(e => new
    {
        e.Id,
        e.Nome,
        e.Frequencia,
        MediaAluno = Math.Round(e.Notas.Any() ? e.Notas.Average(n => (double)n.Valor) : 0, 2),
        MediaTurma = Math.Round(mediaTurma, 2),
        Notas = e.Notas.Select(n => new
        {
            n.Disciplina,
            n.Valor
        })
    });

    return Results.Ok(resultado);
});
app.Run();
