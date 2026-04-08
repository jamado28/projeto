let carros = [];

module.exports = {
  create: (carro) => {
    carro.id = carros.length + 1;
    carros.push(carro);
    return carro;
  },

  getByPessoa: (pessoaId) => {
    return carros.filter(c => c.pessoaId == pessoaId);
  }
};