import api from "../api.js";
import ux from "../ux/exibicao.js";

const DISCIPLINAS = [
  "Matemática",
  "Português",
  "História",
  "Geografia",
  "Ciências",
];


export function handlerCancelEdicao(event){
  event.preventDefault();
  const sectionEdicaoAluno = document.querySelector("#edicaoAluno");
  sectionEdicaoAluno.classList.add("hidden")
 
}

export async function handleSubmitEdicao(event) {
  event.preventDefault();

  const formularioEdicao = event.target.closest("form");

  const alunoId = formularioEdicao.querySelector("#edit-id").value;
  const nomeAluno = formularioEdicao.querySelector("#edit-nome").value;
  const frequenciaAluno = parseFloat(
    formularioEdicao.querySelector("#edit-frequencia").value
  );

  const notasAtualizadas = [];

  DISCIPLINAS.forEach((disciplina) => {
    const camposNota = formularioEdicao.querySelectorAll(
      `.notas-container[data-disc="${disciplina}"] input`
    );

    camposNota.forEach((campoNota) => {
      const valorNota = parseFloat(campoNota.value);
      if (!isNaN(valorNota)) {
        notasAtualizadas.push({ disciplina, valor: valorNota });
      }
    });
  });

  const alunoAtualizado = {
    nome: nomeAluno,
    frequencia: frequenciaAluno,
    notas: notasAtualizadas,
  };

  await api.atualizaAluno(alunoId, alunoAtualizado);
  await ux.mostraTodosAlunos();

  formularioEdicao.reset();
  document.querySelector("#edicaoAluno").classList.add("hidden");
}




export function preencherFormularioDeEdicao(aluno) {
  // ‣ Mostra a seção de edição
  const secaoEdicao = document.querySelector("#edicaoAluno");
  secaoEdicao.classList.remove("hidden");

  // ‣ Campos fixos (id, nome, frequência)
  const form = document.querySelector("#formularioEdicao");
  form.querySelector("#edit-id").value = aluno.id;
  form.querySelector("#edit-nome").value = aluno.nome;
  form.querySelector("#edit-frequencia").value = aluno.frequencia;

  // ‣ Reorganiza as notas em um objeto { disciplina: [valores...] }
  const notasPorDisciplina = {};
  aluno.notas.forEach((nota) => {
    if (!notasPorDisciplina[nota.disciplina])
      notasPorDisciplina[nota.disciplina] = [];
    notasPorDisciplina[nota.disciplina].push(nota.valor);
  });

  // ‣ Gera dinamicamente os inputs para cada disciplina
  DISCIPLINAS.forEach((disciplina) => {
    const container = document.querySelector(
      `.notas-container[data-disc="${disciplina}"]`
    );
    container.innerHTML = ""; // limpa qualquer conteúdo antigo

    const listaDeNotas = notasPorDisciplina[disciplina] ?? [];

    listaDeNotas.forEach((valor, indice) => {
      const numeroNota = indice + 1; // para rótulo “Nota 1 …”

      const grupo = document.createElement("div");

      const rotulo = document.createElement("label");
      rotulo.htmlFor = `${disciplina}-nota-${numeroNota}`;
      rotulo.textContent = `Nota ${numeroNota}:`;

      const input = document.createElement("input");
      input.type = "number";
      input.id = `${disciplina}-nota-${numeroNota}`;
      input.name = `${disciplina}-nota-${numeroNota}`;
      input.min = 0;
      input.max = 10;
      input.step = 0.1;
      input.value = valor; // valor atual da nota

      grupo.append(rotulo, input);
      container.appendChild(grupo);
    });
  });
}
