import api from "../api.js";
import ux from "../ux/exibicao.js";

export async function handleSubmitEdicao(event) {
  event.preventDefault();

  const form = document.querySelector("#formularioEdicao");

  const id = form.querySelector("#edit-id").value;
  const nome = form.querySelector("#edit-nome").value;
  const frequencia = parseFloat(form.querySelector("#edit-frequencia").value);

  const notas = [
    {
      disciplina: "Matemática",
      valor: parseFloat(form.querySelector("#edit-nota1").value),
    },
    {
      disciplina: "Português",
      valor: parseFloat(form.querySelector("#edit-nota2").value),
    },
    {
      disciplina: "História",
      valor: parseFloat(form.querySelector("#edit-nota3").value),
    },
    {
      disciplina: "Geografia",
      valor: parseFloat(form.querySelector("#edit-nota4").value),
    },
    {
      disciplina: "Ciências",
      valor: parseFloat(form.querySelector("#edit-nota5").value),
    },
  ];

  const alunoAtualizado = {
    nome,
    frequencia,
    notas,
  };

  await api.atualizaAluno(id, alunoAtualizado);
  await ux.mostraTodosAlunos();

  form.reset();
  document.querySelector("#edicaoAluno").classList.add("hidden");
}

export function preencherFormularioDeEdicao(aluno) {
  const sectionFormEdicao = document.querySelector("#edicaoAluno");
  sectionFormEdicao.classList.remove("hidden");

  const form = document.querySelector("#formularioEdicao");

  form.querySelector("#edit-id").value = aluno.id;
  form.querySelector("#edit-nome").value = aluno.nome;
  form.querySelector("#edit-nota1").value = aluno.mediasPorDisciplina[0].media;
  form.querySelector("#edit-nota2").value = aluno.mediasPorDisciplina[1].media;
  form.querySelector("#edit-nota3").value = aluno.mediasPorDisciplina[2].media;
  form.querySelector("#edit-nota4").value = aluno.mediasPorDisciplina[3].media;
  form.querySelector("#edit-nota5").value = aluno.mediasPorDisciplina[4].media;
  form.querySelector("#edit-frequencia").value = aluno.frequencia;
}

export function handlerCancelEdicao(event) {
  event.preventDefault();

  const form = document.querySelector("#formularioEdicao");
  const sectionFormEdicao = document.querySelector("#edicaoAluno");

  form.reset();
  sectionFormEdicao.classList.add("hidden");
}
