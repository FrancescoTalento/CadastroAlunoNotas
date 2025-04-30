const endPoint = "http://localhost:5251/api/alunos";

const api = {
  async buscaAlunos() {
    try {
      const response = await fetch(endPoint);
      if (!response.ok) throw new Error("Erro ao buscar alunos");

      return await response.json();
    } catch (error) {
        console.log("Erro ao buscar alunos:"+error)
    }
  },
  
  async buscaAlunosEmAtencao() {
    try {
      const response = await fetch(`${endPoint}/atencao`);
      if (!response.ok) throw new Error("Erro ao buscar alunos em atencao");

      return await response.json();
    } catch (error) {
      console.log("Error ao buscar Alunos em Atencao:" + error);
    }
  },

  async cadastraAluno(aluno) {
    try {
      const response = await fetch(endPoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aluno),
      });
      if (!response.ok) throw new Error("Erro no servidor");

      const dados = await response.json();
      alert("Aluno Adicionado com Sucesso");
      return dados;
    } catch (error) {
      alert("Erro ao Adicionar Aluno");
      console.log("Error ao adicionar Aluno:" + error);
    }
  },
};

export default api;
