export function obterAlunoDoFormulario() {
  const nome = document.querySelector("#nome").value;
  const frequencia = document.querySelector("#frequencia").value;

  const notas = [
    "Matemática",
    "Português",
    "História",
    "Geografia",
    "Ciências",
  ].map((disciplina, i) => ({
    disciplina,
    valor: document.querySelector(`#nota${i + 1}`).value,
  }));

  return {
    nome: nome,
    frequencia: frequencia,
    notas: notas,
  };
}
