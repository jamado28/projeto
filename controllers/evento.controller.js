const Evento = require("../models/evento.model");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const Pessoa = require("../models/pessoa.model");
const Bilhete = require("../models/bilhete.model");

const endpoints = {};

// CREATE
endpoints.createEvento = async (req, res) => {
  const { nome, data, local_evento, preco_visitante, preco_participante, limite_participantes } = req.body;

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token não fornecido"
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.secret);

    // cliente não pode criar eventos
    if (decoded.role !== "admin" && decoded.role !== "organizador") {
      return res.status(403).json({
        message: "Sem permissão para criar eventos"
      });
    }
    const existe = await Evento.findOne({
      where: { nome, data, local_evento }
    });

    if (existe) {
      return res.status(400).json({ message: "Evento já existe" });
    }
    const dados = await Evento.create({
      nome,
      data,
      local_evento,
      preco_visitante,
      preco_participante,
      limite_participantes,
      user_id: decoded.id
    });

    res.status(201).json({
      status: "success",
      message: "Evento criado com sucesso.",
      data: dados,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erro ao criar evento."
    });
  }
};

// GET ALL
endpoints.getAllEventos = async (req, res) => {
  try {
    const dados = await Evento.findAll();

    res.status(200).json({
      status: "success",
      message: "Lista de eventos.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao listar eventos.",
      data: null,
    });
  }
};

// GET BY ID
endpoints.getEventoById = async (req, res) => {
  const { id } = req.params;

  try {
    const dados = await Evento.findOne({
      where: { id_evento: id },
    });

    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Evento não encontrado.",
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Evento encontrado.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao procurar evento.",
      data: null,
    });
  }
};

// GET BY USER ORGANIZADOR
endpoints.getEventosByUser = async (req, res) => {
  const { id } = req.params;

  try {
    const dados = await Evento.findAll({
      where: { user_id: id }
    });

    res.status(200).json({
      status: "success",
      data: dados,
    });

  } catch (error) {
    res.status(500).json({
      message: "Erro ao listar eventos do organizador."
    });
  }
};


// UPDATE
endpoints.updateEvento = async (req, res) => {
  const { id } = req.params;
  const { nome, data, local_evento, preco_visitante, preco_participante } = req.body;

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token não fornecido"
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.secret);

    const evento = await Evento.findByPk(id);

    if (!evento) {
      return res.status(404).json({
        message: "Evento não encontrado."
      });
    }

    // cliente não pode
    if (decoded.role === "cliente") {
      return res.status(403).json({
        message: "Clientes não podem atualizar eventos"
      });
    }

    // organizador só os seus
    if (decoded.role === "organizador" && evento.user_id !== decoded.id) {
      return res.status(403).json({
        message: "Não autorizado"
      });
    }

    await Evento.update(
      { nome, data, local_evento, preco_visitante, preco_participante },
      { where: { id_evento: id } }
    );

    res.status(200).json({
      message: "Evento atualizado com sucesso."
    });

  } catch (error) {
    res.status(500).json({
      message: "Erro ao atualizar evento."
    });
  }
};

// DELETE
endpoints.deleteEvento = async (req, res) => {
  const { id } = req.params;

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.secret);

    const evento = await Evento.findByPk(id);

    if (!evento) {
      return res.status(404).json({
        message: "Evento não encontrado."
      });
    }

    if (decoded.role !== "admin" && evento.user_id !== decoded.id) {
      return res.status(403).json({
        message: "Não autorizado"
      });
    }

    await Evento.destroy({ where: { id_evento: id } });

    res.status(200).json({
      message: "Evento apagado com sucesso."
    });

  } catch (error) {
    res.status(500).json({
      message: "Erro ao apagar evento."
    });
  }
};

module.exports = endpoints;