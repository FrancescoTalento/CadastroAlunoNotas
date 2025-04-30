import interacoesUx from "./interacoes.js";

export function criaItemAluno(aluno, type = null) {
  const liAluno = document.createElement("li");

  switch (type) {
    case "frequencia":
      liAluno.textContent = `${aluno.nome}: ${aluno.frequencia}% de frequência`;
      break;
    case "media":
      liAluno.textContent = `${aluno.nome}: ${aluno.mediaAluno} de média geral`;
      break;
    default:
      liAluno.textContent = aluno.nome;
  }

  return liAluno;
}

export function criaTrAluno(aluno) {
  const tr = document.createElement("tr");

  const tdNome = document.createElement("td");
  tdNome.textContent = aluno.nome;

  const tdMedia = document.createElement("td");
  tdMedia.innerHTML = aluno.mediasPorDisciplina
    .map((d) => `<strong>${d.disciplina}:</strong> ${d.media}`)
    .join("<br>");

  const tdFreq = document.createElement("td");
  tdFreq.textContent = aluno.frequencia + "%";

  const tdAcoes = document.createElement("td");
  const btnExcluir = criaBotao("Excluir", "btn-excluir", () =>
    interacoesUx.removerAluno(aluno.id)
  );
  const btnEditar = criaBotao("Editar", "btn-editar", () =>
    interacoesUx.editaAluno(aluno.id, aluno)
  );
  const btnAddNota = criaBotao("AddNota", "btn-addNota", () =>
    interacoesUx.adicionarNota(aluno.id,aluno)
  );

  tdAcoes.appendChild(btnExcluir);
  tdAcoes.appendChild(btnEditar);
  tdAcoes.appendChild(btnAddNota);

  tr.append(tdNome, tdMedia, tdFreq, tdAcoes);
  return tr;
}

function criaBotao(texto, classe, onClick) {
  const btn = document.createElement("button");
  btn.textContent = texto;
  btn.classList.add(classe);
  btn.addEventListener("click", onClick);
  return btn;
}
