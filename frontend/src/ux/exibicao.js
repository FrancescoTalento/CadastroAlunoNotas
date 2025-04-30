import api from "../api.js";
import { criaItemAluno, criaTrAluno } from "./componentes.js";

const ux = {
  async mostraAlunos() {
    const tBody = document.querySelector("#tabelaAluno");
    const alunos = await api.buscaAlunos();
    tBody.innerHTML = "";
    alunos.forEach((aluno) => tBody.appendChild(criaTrAluno(aluno)));
  },

  async mostraAlunosComFrequenciaBaixa() {
    const lista = document.querySelector("#frequenciaBaixa");
    const alunos = await api.buscaAlunosEmAtencao();
    lista.innerHTML = "";
    alunos.forEach((aluno) => lista.appendChild(criaItemAluno(aluno)));
  },

  async mostraAlunosAcimaDaMedia() {
    const lista = document.querySelector("#mediaAlta");
    const alunos = await api.buscaAlunosAcimaDaMedia();
    lista.innerHTML = "";
    alunos.forEach((aluno) => lista.appendChild(criaItemAluno(aluno)));
  },

  async mostraMediaTurmaPorDisciplina() {
    const lista = document.querySelector("#mediaPorDisciplina");
    const medias = await api.buscaMediaNotasTurma();
    lista.innerHTML = "";
    medias.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${item.disciplina}:</strong> ${item.media}`;
      lista.appendChild(li);
    });
  },
};

export default ux;
