let pagamentos = [];

module.exports = {
  create: (pagamento) => {
    pagamento.id = pagamentos.length + 1;
    pagamentos.push(pagamento);
    return pagamento;
  }
};