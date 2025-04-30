import "./style.css";
import api from "./api.js";
import ux from "./ux/exibicao.js";
import { obterAlunoDoFormulario } from "./Helpers/alunoFormHelper.js";

document.addEventListener("DOMContentLoaded", () => {
  inicializarApp();
});

function inicializarApp() {
  ux.mostraAlunos();
  ux.mostraAlunosComFrequenciaBaixa();
  ux.mostraAlunosAcimaDaMedia();
  ux.mostraMediaTurmaPorDisciplina();

  const form = document.querySelector("#formularioAluno");
  form.addEventListener("submit", handleSubmitForm);
}

async function handleSubmitForm(event) {
  event.preventDefault();

  const aluno = obterAlunoDoFormulario();
  await api.cadastraAluno(aluno);

  ux.mostraAlunos();
  ux.mostraAlunosComFrequenciaBaixa();
  ux.mostraAlunosAcimaDaMedia();
  ux.mostraMediaTurmaPorDisciplina();

  event.target.reset();
}
