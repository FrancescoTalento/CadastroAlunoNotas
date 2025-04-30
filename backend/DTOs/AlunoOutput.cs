namespace backend.DTOs;

public record AlunoOutput(
    int Id,
    string Nome,
    decimal Frequencia,
    double Media
);
