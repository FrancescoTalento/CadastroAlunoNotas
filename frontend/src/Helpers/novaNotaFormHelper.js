import api from "../api.js";
import ux from "../ux/exibicao.js";

export async function handleSubmitNovaNota(event, id) {
  event.preventDefault();

  const form = document.querySelector("#formularioNotas");

  const notas = [
    {
      disciplina: "Matemática",
      valor: parseFloat(form.querySelector("#nova-nota1").value),
    },
    {
      disciplina: "Português",
      valor: parseFloat(form.querySelector("#nova-nota2").value),
    },
    {
      disciplina: "História",
      valor: parseFloat(form.querySelector("#nova-nota3").value),
    },
    {
      disciplina: "Geografia",
      valor: parseFloat(form.querySelector("#nova-nota4").value),
    },
    {
      disciplina: "Ciências",
      valor: parseFloat(form.querySelector("#nova-nota5").value),
    },
  ];

  await api.patchNotas(id, notas);

  form.reset();
  document.querySelector("#adicionarNotas").classList.add("hidden");
  await ux.mostraTodosAlunos();
}

export async function handleResetNovaNota(event) {
  event.preventDefault();
  document.querySelector("#adicionarNotas").classList.add("hidden");
}
