import api from "./api.js";
const ux = {
    
  async mostraMediaTurmaPorDisciplina() {
    try {
      const mediaNotas = await api.buscaMediaNotasTurma();
      const listaMediaNotas = document.querySelector("#mediaPorDisciplina");
        
    
      listaMediaNotas.innerHTML = "";

      mediaNotas.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${item.disciplina}:</strong> ${item.media}`;
        listaMediaNotas.appendChild(li);
      });
    } catch (error) {
      console.error("Erro ao buscar médias por disciplina:", error);
    }
  },
  async mostraAlunosAcimaDaMedia() {
    try {
      const alunosJson = await api.buscaAlunosAcimaDaMedia();
      const listaAlunos = document.querySelector("#mediaAlta");

      listaAlunos.innerHTML = "";
      alunosJson.forEach((aluno) => {
        listaAlunos.appendChild(this.criaItemAluno(aluno));
      });
    } catch (error) {
      console.log(error);
    }
  },
  async mostraAlunosComFrequenciaBaixa() {
    try {
      const alunosJson = await api.buscaAlunosEmAtencao();
      const listaAlunos = document.querySelector("#frequenciaBaixa");

      listaAlunos.innerHTML = "";
      alunosJson.forEach((aluno) => {
        listaAlunos.appendChild(this.criaItemAluno(aluno));
      });
    } catch (error) {
      console.log(error);
    }
  },
  criaItemAluno(aluno) {
    const liAluno = document.createElement("li");
    liAluno.textContent = aluno.nome;

    return liAluno;
  },
  async mostraAlunos() {
    try {
      const tBody = document.querySelector("#tabelaAluno");
      const alunosJson = await api.buscaAlunos();

      tBody.innerHTML = ""
      alunosJson.forEach((aluno) => {
        tBody.appendChild(this.criaTrAluno(aluno));
      });
    } catch (error) {
      console.log(error);
    }
  },

  criaTrAluno(aluno) {
    const tr = document.createElement("tr");
    const tdNome = document.createElement("td");
    const tdMediaD = document.createElement("td");
    const tdFrequencia = document.createElement("td");

    tdNome.textContent = aluno.nome;
    tdFrequencia.textContent = aluno.frequencia + "%";

    // Juntar todas as médias por disciplina com quebra de linha
    tdMediaD.innerHTML = aluno.mediasPorDisciplina
      .map((d) => `<strong>${d.disciplina}:</strong> ${d.media}`)
      .join("<br>");

    tr.appendChild(tdNome);
    tr.appendChild(tdMediaD);
    tr.appendChild(tdFrequencia);

    return tr;
  },
};

export default ux;
