const Pessoa = require("../models/pessoa.model");

const endpoints = {};

// CREATE
endpoints.createPessoa = async (req, res) => {
  const { nif, nome, email, telemovel, data_nascimento } = req.body;

  try {
    const dados = await Pessoa.create({
      nif,
      nome,
      email,
      telemovel,
      data_nascimento,
    });

    res.status(200).json({
      status: "success",
      message: "Pessoa criada com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao criar pessoa.",
      data: null,
    });
  }
};


// GET ALL
endpoints.getAllPessoas = async (req, res) => {
  try {
    const dados = await Pessoa.findAll();

    res.status(200).json({
      status: "success",
      message: "Lista de pessoas.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao listar pessoas.",
      data: null,
    });
  }
};


// GET BY ID (nif)
endpoints.getPessoaById = async (req, res) => {
  const { id } = req.params;

  try {
    const dados = await Pessoa.findOne({
      where: { nif: id },
    });

    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Pessoa não encontrada.",
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Pessoa encontrada.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao procurar pessoa.",
      data: null,
    });
  }
};


// UPDATE
endpoints.updatePessoa = async (req, res) => {
  const { id } = req.params;
  const { nome, email, telemovel, data_nascimento } = req.body;

  try {
    const dados = await Pessoa.update(
      { nome, email, telemovel, data_nascimento },
      { where: { nif: id } }
    );

    if (dados[0] === 0) {
      return res.status(404).json({
        status: "error",
        message: "Pessoa não encontrada.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Pessoa atualizada com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao atualizar pessoa.",
      data: null,
    });
  }
};


// DELETE
endpoints.deletePessoa = async (req, res) => {
  const { id } = req.params;

  try {
    const dados = await Pessoa.destroy({
      where: { nif: id },
    });

    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Pessoa não encontrada.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Pessoa apagada com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao apagar pessoa.",
      data: null,
    });
  }
};

module.exports = endpoints;