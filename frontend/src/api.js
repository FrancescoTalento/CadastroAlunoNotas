// src/api.js

const BASE_URL = "http://localhost:5251/api/alunos";

// Função genérica de fetch com tratamento de erro
async function fetchJson(url, options = {}, errorMsg = "Erro na requisição") {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return await response.json();
  } catch (error) {
    console.error(`${errorMsg}:`, error);
    throw error;
  }
}

const api = {
  buscaAlunos() {
    return fetchJson(BASE_URL, {}, "Erro ao buscar alunos");
  },

  buscaMediaNotasTurma() {
    return fetchJson(
      `${BASE_URL}/MediaNota`,
      {},
      "Erro ao buscar médias das disciplinas"
    );
  },

  buscaAlunosAcimaDaMedia() {
    return fetchJson(
      `${BASE_URL}/acimaMedia`,
      {},
      "Erro ao buscar alunos acima da média"
    );
  },

  buscaAlunosEmAtencao() {
    return fetchJson(
      `${BASE_URL}/atencao`,
      {},
      "Erro ao buscar alunos em atenção"
    );
  },

  async cadastraAluno(aluno) {
    try {
      const dados = await fetchJson(
        BASE_URL,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(aluno),
        },
        "Erro ao cadastrar aluno"
      );

      alert("Aluno adicionado com sucesso!");
      return dados;
    } catch (error) {
      alert("Erro ao adicionar aluno.");
      console.log(error)
    }
  },
};

export default api;
