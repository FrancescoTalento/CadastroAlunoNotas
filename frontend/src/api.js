const BASE_URL = "http://localhost:5251/api/alunos";

// Funcao generica de fetch com tratamento de erro
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

async function fetchVoid(url, options = {}, errorMsg = "Erro na requisição") {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
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
      console.log(error);
    }
  },
  async atualizaAluno(id, aluno) {
    try {
      await fetchVoid(
        `${BASE_URL}/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(aluno),
        },
        "Erro ao atualizar aluno"
      );
      alert("Aluno atualizado com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar aluno.");
      console.log(error);
    }
  },

  async deletaAluno(id) {
    try {
      await fetchVoid(
        `${BASE_URL}/${id}`,
        {
          method: "DELETE",
        },
        "Erro ao deletar aluno"
      );
      alert("Aluno deletado com sucesso!");
    } catch (error) {
      alert("Erro ao deletar aluno.");
      console.log(error);
    }
  },
  async patchNotas(id, notas) {
    try {
      await fetchVoid(
        `${BASE_URL}/${id}/notas`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(notas),
        },
        "Erro ao atualizar apenas as notas"
      );
      alert("Notas atualizadas com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar as notas.");
      console.error(error);
    }
  },
  async buscaAlunoPorId(id) {
    try {
      return await fetchJson(
        `${BASE_URL}/${id}`,
        {},
        `Erro ao buscar aluno com ID ${id}`
      );
    } catch (error) {
      alert("Erro ao buscar aluno por ID.");
      console.error(error);
    }
  },
};

export default api;
