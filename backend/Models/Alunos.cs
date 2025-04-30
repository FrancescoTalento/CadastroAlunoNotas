namespace backend.Models
{
    public record AlunoInput(
        string Nome,
        decimal Frequencia,
        List<NotaInput> Notas
    );

    public record NotaInput(
        string Disciplina,
        decimal Valor
    );
}
