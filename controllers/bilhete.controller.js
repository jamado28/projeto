const Bilhete = require("../models/bilhete.model");
const Pessoa = require("../models/pessoa.model");
const Evento = require("../models/evento.model");

const endpoints = {};


// CREATE
endpoints.createBilhete = async (req, res) => {
  const { ano_bilhete, pessoa_nif, id_evento } = req.body;

  try {
    // validar pessoa
    const pessoa = await Pessoa.findByPk(pessoa_nif);
    if (!pessoa) {
      return res.status(404).json({
        status: "error",
        message: "Pessoa não encontrada.",
      });
    }

    // validar evento
    const evento = await Evento.findByPk(id_evento);
    if (!evento) {
      return res.status(404).json({
        status: "error",
        message: "Evento não encontrado.",
      });
    }

    const dados = await Bilhete.create({
      ano_bilhete,
      pessoa_nif,
      id_evento,
    });

    res.status(201).json({
      status: "success",
      message: "Bilhete criado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao criar bilhete.",
      data: null,
    });
  }
};


// GET ALL
endpoints.getAllBilhetes = async (req, res) => {
  try {
    const dados = await Bilhete.findAll({
      include: ["pessoa", "evento"], // join automático
    });

    res.status(200).json({
      status: "success",
      message: "Lista de bilhetes.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao listar bilhetes.",
      data: null,
    });
  }
};


// GET BY ID
endpoints.getBilheteById = async (req, res) => {
  const { id } = req.params;

  try {
    const dados = await Bilhete.findOne({
      where: { id_bilhete: id },
      include: ["pessoa", "evento"],
    });

    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Bilhete não encontrado.",
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Bilhete encontrado.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao procurar bilhete.",
      data: null,
    });
  }
};


// UPDATE
endpoints.updateBilhete = async (req, res) => {
  const { id } = req.params;
  const { ano_bilhete } = req.body;

  try {
    const dados = await Bilhete.update(
      { ano_bilhete },
      { where: { id_bilhete: id } }
    );

    if (dados[0] === 0) {
      return res.status(404).json({
        status: "error",
        message: "Bilhete não encontrado.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Bilhete atualizado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao atualizar bilhete.",
      data: null,
    });
  }
};


// DELETE
endpoints.deleteBilhete = async (req, res) => {
  const { id } = req.params;

  try {
    const dados = await Bilhete.destroy({
      where: { id_bilhete: id },
    });

    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Bilhete não encontrado.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Bilhete apagado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao apagar bilhete.",
      data: null,
    });
  }
};

module.exports = endpoints;