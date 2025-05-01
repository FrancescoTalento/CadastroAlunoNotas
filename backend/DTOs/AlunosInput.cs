using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public record AlunoInput(
    [Required, StringLength(50, MinimumLength = 3)] string Nome,
    [Range(0, 100)] decimal Frequencia,
    [MinLength(1)] List<NotaInput> Notas
);

public record NotaInput(
    [Range(1, int.MaxValue)] int DisciplinaId,
    [Range(0, 10)] decimal Valor
);

}
