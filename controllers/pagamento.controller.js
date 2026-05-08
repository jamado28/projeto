const Pagamento = require("../models/pagamento.model");
const Bilhete = require("../models/bilhete.model");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const Pessoa = require("../models/pessoa.model");
const Evento = require("../models/evento.model");

const endpoints = {};


// CREATE
endpoints.createPagamento = async (req, res) => {
  const { iban, estado, id_bilhete } = req.body;
  // validar IBAN
  if (!/^PT50\d{21}$/.test(iban)) {
    return res.status(400).json({
      message: "IBAN inválido"
    });
  }
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token não fornecido"
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.secret);
    
    // só cliente paga
    if (decoded.role !== "cliente") {
      return res.status(403).json({
        message: "Apenas clientes podem fazer pagamentos"
      });
    }
    
    const bilhete = await Bilhete.findByPk(id_bilhete);
    const evento = await Evento.findByPk(bilhete.id_evento);

    let preco;

    if (bilhete.tipo === "participante") {
      preco = evento.preco_participante;
    } else {
      preco = evento.preco_visitante;
    }

    if (!bilhete) {
      return res.status(404).json({
        message: "Bilhete não encontrado."
      });
    }

    // verificar se o bilhete é do user
    const pessoa = await Pessoa.findOne({
      where: { user_id: decoded.id }
    });

    if (!pessoa) {
      return res.status(404).json({
        message: "Pessoa não encontrada"
      });
    }

    if (bilhete.id_pessoa !== pessoa.id_pessoa) {
      return res.status(403).json({
        message: "Não autorizado"
      });
    }

    // evitar pagamento duplicado
    const existe = await Pagamento.findOne({
      where: { id_bilhete }
    });

    if (existe) {
      return res.status(400).json({
        message: "Este bilhete já foi pago"
      });
    }

    const dados = await Pagamento.create({
      iban,
      preco,
      estado,
      id_bilhete,
    });

    res.status(201).json({
      status: "success",
      data: dados,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erro ao criar pagamento."
    });
  }
};


// GET ALL
endpoints.getAllPagamentos = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.secret);

    let dados;

    // admin
    if (decoded.role === "admin") {
      dados = await Pagamento.findAll({
        include: {
          model: Bilhete,
          as: "bilhete"
        }
      });
    }

    // cliente
    else if (decoded.role === "cliente") {

      const pessoa = await Pessoa.findOne({
        where: { user_id: decoded.id }
      });

      dados = await Pagamento.findAll({
        include: {
          model: Bilhete,
          as: "bilhete",
          where: { id_pessoa: pessoa.id_pessoa }
        }
      });
    }

    // organizador
    else {

      dados = await Pagamento.findAll({
        include: {
          model: Bilhete,
          as: "bilhete",
          required: true,
          include: {
            model: Evento,
            as: "evento",
            where: { user_id: decoded.id }
          }
        }
      });
    }

    res.status(200).json({
      status: "success",
      data: dados,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erro ao listar pagamentos."
    });
  }
};


// GET BY ID
endpoints.getPagamentoById = async (req, res) => {
  const { id } = req.params;

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.secret);

    const pagamento = await Pagamento.findOne({
      where: { id_pagamento: id },
      include: {
        model: Bilhete,
        as: "bilhete",
        include: {
          model: Evento,
          as: "evento"
        }
      }
    });

    if (!pagamento) {
      return res.status(404).json({
        message: "Pagamento não encontrado."
      });
    }

    // admin
    if (decoded.role === "admin") {
      return res.status(200).json(pagamento);
    }

    const pessoa = await Pessoa.findOne({
      where: { user_id: decoded.id }
    });

    // cliente dono
    if (pessoa && pagamento.bilhete.id_pessoa === pessoa.id_pessoa) {
      return res.status(200).json(pagamento);
    }

    // organizador
    if (pagamento.bilhete.evento.user_id === decoded.id) {
      return res.status(200).json(pagamento);
    }

    return res.status(403).json({
      message: "Não autorizado"
    });

  } catch (error) {
    res.status(500).json({
      message: "Erro ao procurar pagamento."
    });
  }
};


// DELETE
endpoints.deletePagamento = async (req, res) => {
  const { id } = req.params;

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token não fornecido"
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.secret);

    // só admin pode apagar
    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "Apenas admin pode apagar pagamentos"
      });
    }

    const pagamento = await Pagamento.findByPk(id);

    if (!pagamento) {
      return res.status(404).json({
        message: "Pagamento não encontrado."
      });
    }

    await Pagamento.destroy({ where: { id_pagamento: id } });

    res.status(200).json({
      message: "Pagamento apagado com sucesso."
    });

  } catch (error) {
    res.status(500).json({
      message: "Erro ao apagar pagamento."
    });
  }
};

module.exports = endpoints;