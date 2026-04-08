const carroModel = require("../models/carro.model");

exports.createCarro = (req, res) => {
  const carro = carroModel.create(req.body);
  res.json(carro);
};

exports.getCarrosByPessoa = (req, res) => {
  const carros = carroModel.getByPessoa(req.params.pessoaId);
  res.json(carros);
};