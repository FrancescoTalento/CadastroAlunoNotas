import "./style.css";
import api from "./api.js";
import ux from "./ux/exibicao.js";

document.addEventListener("DOMContentLoaded", () => {
  carregaUx();

  const form = document.querySelector("#formularioAluno");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await criarAlunoJson();
    carregaUx();
    form.reset();
  });
});

function carregaUx() {
  ux.mostraAlunos();
  ux.mostraAlunosComFrequenciaBaixa();
  ux.mostraAlunosAcimaDaMedia();
  ux.mostraMediaTurmaPorDisciplina();
}
async function criarAlunoJson() {
  const nomeAluno = document.querySelector("#nome").value;

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

  const frequencia = document.querySelector("#frequencia").value;

  const aluno = {
    nome: nomeAluno,
    frequencia: frequencia,
    notas,
  };

  await api.cadastraAluno(aluno);
}
