namespace backend.DTOs
{
    public record AlunoInput(
        string Nome,
        decimal Frequencia,
        List<NotaInput> Notas
    );

    public record NotaInput(
        int DisciplinaId,
        decimal Valor
    );
}
