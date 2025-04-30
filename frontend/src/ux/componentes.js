// src/ux/componentes.js

export function criaItemAluno(aluno) {
  const liAluno = document.createElement("li");
  liAluno.textContent = aluno.nome;
  return liAluno;
}

export function criaTrAluno(aluno) {
  const tr = document.createElement("tr");
  const tdNome = document.createElement("td");
  const tdMediaD = document.createElement("td");
  const tdFrequencia = document.createElement("td");

  tdNome.textContent = aluno.nome;
  tdFrequencia.textContent = aluno.frequencia + "%";

  tdMediaD.innerHTML = aluno.mediasPorDisciplina
    .map((d) => `<strong>${d.disciplina}:</strong> ${d.media}`)
    .join("<br>");

  tr.appendChild(tdNome);
  tr.appendChild(tdMediaD);
  tr.appendChild(tdFrequencia);

  return tr;
}
