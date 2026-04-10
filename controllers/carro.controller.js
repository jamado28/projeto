const Carro = require("../models/carro.model");
const Pessoa = require("../models/pessoa.model");

const endpoints = {};


// CREATE
endpoints.createCarro = async (req, res) => {
  const { matricula, marca, modelo, ano, img_url, pessoa_nif } = req.body;

  try {
    // verificar se a pessoa existe
    const pessoa = await Pessoa.findByPk(pessoa_nif);

    if (!pessoa) {
      return res.status(404).json({
        status: "error",
        message: "Pessoa não encontrada.",
      });
    }

    const dados = await Carro.create({
      matricula,
      marca,
      modelo,
      ano,
      img_url,
      pessoa_nif,
    });

    res.status(201).json({
      status: "success",
      message: "Carro criado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao criar carro.",
      data: null,
    });
  }
};


// GET ALL
endpoints.getAllCarros = async (req, res) => {
  try {
    const dados = await Carro.findAll({
      include: "pessoa", // traz a pessoa associada
    });

    res.status(200).json({
      status: "success",
      message: "Lista de carros.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao listar carros.",
      data: null,
    });
  }
};


// GET BY ID (matricula)
endpoints.getCarroById = async (req, res) => {
  const { id } = req.params;

  try {
    const dados = await Carro.findOne({
      where: { matricula: id },
      include: "pessoa",
    });

    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Carro não encontrado.",
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Carro encontrado.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao procurar carro.",
      data: null,
    });
  }
};


// UPDATE
endpoints.updateCarro = async (req, res) => {
  const { id } = req.params;
  const { marca, modelo, ano, img_url } = req.body;

  try {
    const dados = await Carro.update(
      { marca, modelo, ano, img_url },
      { where: { matricula: id } }
    );

    if (dados[0] === 0) {
      return res.status(404).json({
        status: "error",
        message: "Carro não encontrado.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Carro atualizado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao atualizar carro.",
      data: null,
    });
  }
};


// DELETE
endpoints.deleteCarro = async (req, res) => {
  const { id } = req.params;

  try {
    const dados = await Carro.destroy({
      where: { matricula: id },
    });

    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Carro não encontrado.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Carro apagado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao apagar carro.",
      data: null,
    });
  }
};

module.exports = endpoints;