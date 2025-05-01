import api from "../api.js";
import ux from "../ux/exibicao.js";

export async function handleSubmitNovaNota(event, id) {
  event.preventDefault();

  const form = document.querySelector("#formularioNotas");

  const notas = [
    {
      disciplinaId: 1,
      valor: parseFloat(form.querySelector("#nova-nota1").value),
    },
    {
      disciplinaId: 2,
      valor: parseFloat(form.querySelector("#nova-nota2").value),
    },
    {
      disciplinaId: 3,
      valor: parseFloat(form.querySelector("#nova-nota3").value),
    },
    {
      disciplinaId: 4,
      valor: parseFloat(form.querySelector("#nova-nota4").value),
    },
    {
      disciplinaId: 5,
      valor: parseFloat(form.querySelector("#nova-nota5").value),
    },
  ];

  await api.patchNotas(id, notas);

  form.reset();
  form
    .querySelectorAll("input[type='number']")
    .forEach((input) => (input.value = ""));

  document.querySelector("#adicionarNotas").classList.add("hidden");
  await ux.mostraTodosAlunos();
}

export async function handleResetNovaNota(event) {
  event.preventDefault();
  const form = document.querySelector("#formularioNotas");
  form
    .querySelectorAll("input[type='number']")
    .forEach((input) => (input.value = ""));


  document.querySelector("#adicionarNotas").classList.add("hidden");
}
