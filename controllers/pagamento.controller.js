const Pagamento = require("../models/pagamento.model");
const Bilhete = require("../models/bilhete.model");

const endpoints = {};


// CREATE
endpoints.createPagamento = async (req, res) => {
  const { iban, preco, estado, id_bilhete } = req.body;

  try {
    // verificar se o bilhete existe
    const bilhete = await Bilhete.findByPk(id_bilhete);

    if (!bilhete) {
      return res.status(404).json({
        status: "error",
        message: "Bilhete não encontrado.",
      });
    }

    const dados = await Pagamento.create({
      iban,
      preco,
      estado,
      id_bilhete,
    });

    res.status(200).json({
      status: "success",
      message: "Pagamento criado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao criar pagamento.",
      data: null,
    });
  }
};


// GET ALL
endpoints.getAllPagamentos = async (req, res) => {
  try {
    const dados = await Pagamento.findAll({
      include: "bilhete", // join
    });

    res.status(200).json({
      status: "success",
      message: "Lista de pagamentos.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao listar pagamentos.",
      data: null,
    });
  }
};


// GET BY ID
endpoints.getPagamentoById = async (req, res) => {
  const { id } = req.params;

  try {
    const dados = await Pagamento.findOne({
      where: { id_pagamento: id },
      include: "bilhete",
    });

    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Pagamento não encontrado.",
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Pagamento encontrado.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao procurar pagamento.",
      data: null,
    });
  }
};


// UPDATE
endpoints.updatePagamento = async (req, res) => {
  const { id } = req.params;
  const { iban, preco, estado } = req.body;

  try {
    const dados = await Pagamento.update(
      { iban, preco, estado },
      { where: { id_pagamento: id } }
    );

    if (dados[0] === 0) {
      return res.status(404).json({
        status: "error",
        message: "Pagamento não encontrado.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Pagamento atualizado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao atualizar pagamento.",
      data: null,
    });
  }
};


// DELETE
endpoints.deletePagamento = async (req, res) => {
  const { id } = req.params;

  try {
    const dados = await Pagamento.destroy({
      where: { id_pagamento: id },
    });

    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Pagamento não encontrado.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Pagamento apagado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao apagar pagamento.",
      data: null,
    });
  }
};

module.exports = endpoints;