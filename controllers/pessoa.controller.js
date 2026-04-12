const Pessoa = require("../models/pessoa.model");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const Bilhete = require("../models/bilhete.model");
const Evento = require("../models/evento.model");

const endpoints = {};

// GET ALL
endpoints.getAllPessoas = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token não fornecido"
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.secret);

    let dados;

    // ADMIN todas
    if (decoded.role === "admin") {
      dados = await Pessoa.findAll();
    }

    // ORGANIZADOR pessoas dos seus eventos
    else if (decoded.role === "organizador") {
      dados = await Pessoa.findAll({
        include: {
          model: Bilhete,
          as: "bilhetes",
          include: {
            model: Evento,
            as: "evento",
            where: { user_id: decoded.id }
          }
        }
      });
    }

    // CLIENTE só a si
    else {
      dados = await Pessoa.findOne({
        where: { user_id: decoded.id }
      });
    }

    res.status(200).json({
      status: "success",
      data: dados,
    });

  } catch (error) {
    res.status(500).json({
      message: "Erro ao listar pessoas."
    });
  }
};


// GET BY ID
endpoints.getPessoaById = async (req, res) => {
  const { id } = req.params;

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.secret);

    const pessoa = await Pessoa.findByPk(id);

    if (!pessoa) {
      return res.status(404).json({
        message: "Pessoa não encontrada."
      });
    }

    // admin
    if (decoded.role === "admin") {
      return res.status(200).json(pessoa);
    }

    // cliente
    const minhaPessoa = await Pessoa.findOne({
      where: { user_id: decoded.id }
    });

    if (minhaPessoa && minhaPessoa.id_pessoa === pessoa.id_pessoa) {
      return res.status(200).json(pessoa);
    }

    // organizador pessoas dos seus eventos
    const bilhete = await Bilhete.findOne({
      where: { pessoa_id: pessoa.id_pessoa },
      include: {
        model: Evento,
        as: "evento",
        where: { user_id: decoded.id }
      }
    });

    if (bilhete) {
      return res.status(200).json(pessoa);
    }

    return res.status(403).json({
      message: "Não autorizado"
    });

  } catch (error) {
    res.status(500).json({
      message: "Erro ao procurar pessoa."
    });
  }
};

// UPDATE
endpoints.updatePessoa = async (req, res) => {
  const { id } = req.params;
  const { nome, email, telemovel, data_nascimento } = req.body;

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.secret);

    if (decoded.role === "admin") {
      await Pessoa.update(
        { nome, email, telemovel, data_nascimento },
        { where: { id_pessoa: id } }
      );

      return res.status(200).json({
        message: "Pessoa atualizada com sucesso."
      });
    }

    // buscar pessoa do user
    const pessoa = await Pessoa.findOne({
      where: { user_id: decoded.id }
    });

    if (!pessoa) {
      return res.status(404).json({
        message: "Pessoa não encontrada."
      });
    }

    // garantir que só edita a sua
    if (pessoa.id_pessoa != id) {
      return res.status(403).json({
        message: "Não autorizado."
      });
    }

    const dados = await Pessoa.update(
      { nome, email, telemovel, data_nascimento },
      { where: { id_pessoa: id } }
    );

    res.status(200).json({
      status: "success",
      message: "Pessoa atualizada com sucesso.",
      data: dados,
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao atualizar pessoa.",
    });
  }
};


module.exports = endpoints;