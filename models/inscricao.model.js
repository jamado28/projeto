let inscricoes = [];

module.exports = {
  create: (inscricao) => {
    inscricao.id = inscricoes.length + 1;
    inscricoes.push(inscricao);
    return inscricao;
  },

  getByPessoa: (pessoaId) => {
    return inscricoes.filter(i => i.pessoaId == pessoaId);
  }
};