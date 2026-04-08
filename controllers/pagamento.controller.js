const pagamentoModel = require("../models/pagamento.model");

exports.createPagamento = (req, res) => {
  const pagamento = pagamentoModel.create(req.body);
  res.json(pagamento);
};