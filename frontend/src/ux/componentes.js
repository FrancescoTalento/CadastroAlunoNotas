import interacoesUx from "./interacoes.js";

export function criaItemAluno(aluno,type=null) {
  const liAluno = document.createElement("li");
  liAluno.textContent = aluno.nome;
  if(type=== null){
    return liAluno;
  }else if(type === "frequencia"){
    liAluno.textContent+= `: ${aluno.frequencia}% de frequencia`
    return liAluno
  }else if(type==="media"){
    console.log(aluno)
      liAluno.textContent += `: ${aluno.mediaAluno} de media geral`;
      return liAluno;
  }
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
  const btnExcluir = document.createElement("button");
  btnExcluir.textContent = "Excluir";
  btnExcluir.classList.add("btn-excluir");
  btnExcluir.addEventListener("click", () =>
    interacoesUx.removerAluno(aluno.id)
  );

  const btnEditar = document.createElement("button");
  btnEditar.textContent = "Editar";
  btnEditar.classList.add("btn-editar");
  btnEditar.addEventListener("click", () =>
    interacoesUx.editaAluno(aluno.id, aluno)
  );
  const btnAddNota = document.createElement("button");
  btnAddNota.textContent = "AddNota";
  btnAddNota.classList.add("btn-addNota");
  btnAddNota.addEventListener("click", () =>
    interacoesUx.adicionarNota(aluno.id, aluno)
  );

  tdAcoes.appendChild(btnExcluir);
  tdAcoes.appendChild(btnEditar);
  tdAcoes.appendChild(btnAddNota);
  
  tr.append(tdNome, tdMedia, tdFreq, tdAcoes);
  return tr;
}
