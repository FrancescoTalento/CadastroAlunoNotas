import api from "../api.js";
import {
  criaItemAluno,
  criaTrAluno,
  criaListaMediaDisciplinas,
} from "./componentes.js";

const ux = {
  async mostraTodosAlunos() {
    await this.mostraAlunos();
    await this.mostraAlunosComFrequenciaBaixa();
    await this.mostraAlunosAcimaDaMedia();
    await this.mostraMediaTurmaPorDisciplina();
  },

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
    alunos.forEach((aluno) =>
      lista.appendChild(criaItemAluno(aluno, "frequencia"))
    );
  },

  async mostraAlunosAcimaDaMedia() {
    const lista = document.querySelector("#mediaAlta");
    const alunos = await api.buscaAlunosAcimaDaMedia();
    lista.innerHTML = "";
    alunos.forEach((aluno) => lista.appendChild(criaItemAluno(aluno, "media")));
  },

  async mostraMediaTurmaPorDisciplina() {
    const lista = document.querySelector("#mediaPorDisciplina");
    try {
      const medias = await api.buscaMediaNotasTurma();
      lista.innerHTML = "";

      if (!Array.isArray(medias) || medias.length === 0) {
        lista.innerHTML = "";
        return;
      }

      lista.appendChild(criaListaMediaDisciplinas(medias));
    } catch (error) {
      lista.innerHTML = "<li>Erro ao carregar médias.</li>";
      console.log(error);
    }
  },
};

export default ux;
