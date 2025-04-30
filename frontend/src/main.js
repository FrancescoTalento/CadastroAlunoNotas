import "./style.css";
import api from "./api.js";
import ux from "./ux/exibicao.js";
import { obterAlunoDoFormulario } from "./Helpers/alunoFormHelper.js";

document.addEventListener("DOMContentLoaded", async () => {
  await inicializarApp();
});

async function inicializarApp() {
  await ux.mostraTodosAlunos();

  const form = document.querySelector("#formularioAluno");
  form.addEventListener("submit", handleSubmitForm);
}

async function handleSubmitForm(event) {
  event.preventDefault();

  const aluno = obterAlunoDoFormulario();
  await api.cadastraAluno(aluno);

  await ux.mostraTodosAlunos();

  event.target.reset();
}
