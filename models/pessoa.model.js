let pessoas = [];

module.exports = {
  create: (pessoa) => {
    pessoa.id = pessoas.length + 1;
    pessoas.push(pessoa);
    return pessoa;
  },

  getAll: () => pessoas
};