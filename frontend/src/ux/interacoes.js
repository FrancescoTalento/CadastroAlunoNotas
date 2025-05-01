import api from "../api.js";
import ux from "./exibicao.js";
import {
  handleSubmitEdicao,
  preencherFormularioDeEdicao,
  handlerCancelEdicao,
} from "../Helpers/edicaoFormHelper.js";

import {
  handleSubmitNovaNota,
  handleResetNovaNota,
} from "../Helpers/novaNotaFormHelper.js";

const interacoesUx = {
  async removerAluno(id) {
    await api.deletaAluno(id);
    await ux.mostraTodosAlunos();
  },
  async editaAluno(id) {
    const aluno = await api.buscaAlunoPorId(id)
    preencherFormularioDeEdicao(aluno);

    const form = document.querySelector("#formularioEdicao");
    const novoForm = form.cloneNode(true); 
    
    form.replaceWith(novoForm);

    novoForm.addEventListener("submit", handleSubmitEdicao);
    novoForm.addEventListener("reset", handlerCancelEdicao);
  },

  async adicionarNota(id, aluno) {
    const section = document.querySelector("#adicionarNotas");
    const form = document.querySelector("#formularioNotas");
    const nome = document.querySelector("#nova-notaNome");

    section.classList.remove("hidden");

    nome.textContent = `Adicionando Nota para ${aluno.nome}`;

    const novoForm = form.cloneNode(true);
    form.replaceWith(novoForm);

    novoForm.addEventListener(
      "submit",
      async (event) => await handleSubmitNovaNota(event, id)
    );

    novoForm.addEventListener("reset", (event) => handleResetNovaNota(event));
  },
};

export default interacoesUx;
