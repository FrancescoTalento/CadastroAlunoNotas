import api from "../api.js";
import ux from "../ux/exibicao.js";

let DISCIPLINAS = [];

export async function inicializarDisciplinas() {
  DISCIPLINAS = await api.buscaDisciplinas();
}


export function handlerCancelEdicao(event) {
  event.preventDefault();
  const sectionEdicaoAluno = document.querySelector("#edicaoAluno");
  sectionEdicaoAluno.classList.add("hidden");
}

export async function handleSubmitEdicao(event) {
  event.preventDefault();

  const form = event.target.closest("form");

  const alunoId = form.querySelector("#edit-id").value;
  const nome = form.querySelector("#edit-nome").value;
  const frequencia = parseFloat(form.querySelector("#edit-frequencia").value);

  const notas = [];

  DISCIPLINAS.forEach(({ id, nome: nomeDisciplina }) => {
    const inputs = form.querySelectorAll(
      `.notas-container[data-disc="${nomeDisciplina}"] input`
    );

    inputs.forEach((input) => {
      const valor = parseFloat(input.value);
      if (!isNaN(valor)) {
        notas.push({ disciplinaId: id, valor });
      }
    });
  });

  const alunoAtualizado = { nome, frequencia, notas };

  await api.atualizaAluno(alunoId, alunoAtualizado);
  await ux.mostraTodosAlunos();

  form.reset();
  document.querySelector("#edicaoAluno").classList.add("hidden");
}

// ✅ Preenche o formulário para edição do aluno
export function preencherFormularioDeEdicao(aluno) {
  const secao = document.querySelector("#edicaoAluno");
  secao.classList.remove("hidden");

  const form = document.querySelector("#formularioEdicao");
  form.querySelector("#edit-id").value = aluno.id;
  form.querySelector("#edit-nome").value = aluno.nome;
  form.querySelector("#edit-frequencia").value = aluno.frequencia;

  // Agrupa por nome da disciplina
  const agrupadas = {};
  aluno.notas.forEach((n) => {
    if (!agrupadas[n.disciplina]) agrupadas[n.disciplina] = [];
    agrupadas[n.disciplina].push(n.valor);
  });

  DISCIPLINAS.forEach(({ nome }) => {
    const container = document.querySelector(
      `.notas-container[data-disc="${nome}"]`
    );
    container.innerHTML = "";

    const notas = agrupadas[nome] ?? [];

    notas.forEach((valor, i) => {
      const idx = i + 1;

      const grupo = document.createElement("div");

      const label = document.createElement("label");
      label.htmlFor = `${nome}-nota-${idx}`;
      label.textContent = `Nota ${idx}:`;

      const input = document.createElement("input");
      input.type = "number";
      input.id = `${nome}-nota-${idx}`;
      input.name = `${nome}-nota-${idx}`;
      input.min = 0;
      input.max = 10;
      input.step = 0.1;
      input.value = valor;

      grupo.append(label, input);
      container.appendChild(grupo);
    });
  });
}
