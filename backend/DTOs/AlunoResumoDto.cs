namespace backend.DTOs;

public record AlunoResumoDto(
    int Id,
    string Nome,
    decimal Frequencia,
    List<MediaDisciplinaDto> MediasPorDisciplina
);
