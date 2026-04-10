const Evento = require("../models/evento.model");

const endpoints = {};

// CREATE
endpoints.createEvento = async (req, res) => {
  const { nome, data, local_evento, preco_visitante, preco_participante } = req.body;

  try {
    const dados = await Evento.create({
      nome,
      data,
      local_evento,
      preco_visitante,
      preco_participante,
    });

    res.status(201).json({
      status: "success",
      message: "Evento criado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao criar evento.",
      data: null,
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

// UPDATE
endpoints.updateEvento = async (req, res) => {
  const { id } = req.params;
  const { nome, data, local_evento, preco_visitante, preco_participante } = req.body;

  try {
    const dados = await Evento.update(
      { nome, data, local_evento, preco_visitante, preco_participante },
      { where: { id_evento: id } }
    );
    if (dados[0] === 0) {
        return res.status(404).json({
            status: "error",
            message: "Evento não encontrado.",
        });
    }

    res.status(200).json({
      status: "success",
      message: "Evento atualizado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao atualizar evento.",
      data: null,
    });
  }
};

// DELETE
endpoints.deleteEvento = async (req, res) => {
  const { id } = req.params;

  try {
    const dados = await Evento.destroy({
      where: { id_evento: id },
    });
    if (!dados) {
        return res.status(404).json({
            status: "error",
            message: "Evento não encontrado.",
        });
    }
    res.status(200).json({
      status: "success",
      message: "Evento apagado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao apagar evento.",
      data: null,
    });
  }
};

module.exports = endpoints;