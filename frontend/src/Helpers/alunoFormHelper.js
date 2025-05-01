export function obterAlunoDoFormulario() {
  const nome = document.querySelector("#nome").value;
  const frequencia = parseFloat(document.querySelector("#frequencia").value);

  const notas = [1, 2, 3, 4, 5].map((disciplinaId, i) => ({
    disciplinaId,
    valor: parseFloat(document.querySelector(`#nota${i + 1}`).value),
  }));

  return {
    nome,
    frequencia,
    notas,
  };
}
