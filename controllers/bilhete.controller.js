const Bilhete = require("../models/bilhete.model");
const Pessoa = require("../models/pessoa.model");
const Evento = require("../models/evento.model");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const Carro = require("../models/carro.model");
const endpoints = {};


// CREATE
endpoints.createBilhete = async (req, res) => {
  const { ano_bilhete, id_evento, tipo, matricula_carro } = req.body;

  try {
    // verificar token
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token não fornecido"
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.secret);

    // só cliente pode criar bilhetes
    if (decoded.role !== "cliente") {
      return res.status(403).json({
        message: "Apenas clientes podem criar bilhetes"
      });
    }

    // buscar pessoa
    const pessoa = await Pessoa.findOne({
      where: { user_id: decoded.id }
    });

    if (!pessoa) {
      return res.status(404).json({
        message: "Pessoa não encontrada"
      });
    }

    // verificar evento
    const evento = await Evento.findByPk(id_evento);
    if (!evento) {
      return res.status(404).json({
        message: "Evento não encontrado."
      });
    }

    // evitar duplicado de bilhete
    const bilheteExistente = await Bilhete.findOne({
      where: {
        id_pessoa: pessoa.id_pessoa,
        id_evento
      }
    });

    if (bilheteExistente) {
      return res.status(400).json({
        message: "Já tens bilhete para este evento."
      });
    }

    // REGRAS PARA PARTICIPANTE
    if (tipo === "participante") {

      // obrigatório indicar carro
      if (!matricula_carro) {
        return res.status(400).json({
          message: "Tem de escolher um carro para participar"
        });
      }

      // verificar se o carro pertence ao utilizador
      const carro = await Carro.findOne({
        where: {
          matricula: matricula_carro,
          id_pessoa: pessoa.id_pessoa
        }
      });

      if (!carro) {
        return res.status(400).json({
          message: "Carro inválido ou não pertence ao utilizador"
        });
      }

      // verificar limite de participantes
      const totalParticipantes = await Bilhete.count({
        where: {
          id_evento,
          tipo: "participante"
        }
      });

      if (totalParticipantes >= evento.limite_participantes) {
        return res.status(400).json({
          message: "Limite de participantes atingido"
        });
      }
    }

    // criar bilhete
    const dados = await Bilhete.create({
      ano_bilhete,
      tipo,
      id_pessoa: pessoa.id_pessoa,
      id_evento,
      matricula_carro: tipo === "participante" ? matricula_carro : null
    });

    res.status(201).json({
      status: "success",
      message: "Bilhete criado com sucesso.",
      data: dados,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Erro ao criar bilhete.",
    });
  }
};


// GET ALL
endpoints.getAllBilhetes = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.secret);

    let dados;

    // ADMIN
    if (decoded.role === "admin") {
      dados = await Bilhete.findAll({
        include: ["pessoa", "evento", "carro"],
      });
    }

    // CLIENTE
    else if (decoded.role === "cliente") {

      const pessoa = await Pessoa.findOne({
        where: { user_id: decoded.id }
      });

      dados = await Bilhete.findAll({
        where: { id_pessoa: pessoa.id_pessoa },
        include: ["pessoa", "evento", "carro"],
      });
    }

    // ORGANIZADOR
    else {
      dados = await Bilhete.findAll({
        include: {
          model: Evento,
          as: "evento",
          where: { user_id: decoded.id }
        }
      });
    }

    res.status(200).json({
      status: "success",
      data: dados,
    });

  } catch (error) {
    res.status(500).json({
      message: "Erro ao listar bilhetes."
    });
  }
};


// GET BY ID
endpoints.getBilheteById = async (req, res) => {
  const { id } = req.params;

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.secret);

    const bilhete = await Bilhete.findOne({
      where: { id_bilhete: id },
      include: ["pessoa", "evento", "carro"],
    });

    if (!bilhete) {
      return res.status(404).json({
        message: "Bilhete não encontrado."
      });
    }

    // admin pode tudo
    if (decoded.role === "admin") {
      return res.status(200).json(bilhete);
    }

    // dono
    const pessoa = await Pessoa.findOne({
      where: { user_id: decoded.id }
    });
    const carro = await Carro.findOne({
      where: { matricula: bilhete.matricula_carro }
    });

    if (carro && pessoa && carro.id_pessoa === pessoa.id_pessoa){
      return res.status(200).json(bilhete);
    }

    // organizador
    if (bilhete) {
      return res.status(200).json(bilhete);
    }

    return res.status(403).json({
      message: "Não autorizado"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erro ao procurar bilhete."
    });
  }
};


// DELETE
endpoints.deleteBilhete = async (req, res) => {
  const { id } = req.params;

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.secret);

    const bilhete = await Bilhete.findOne({
      where: { id_bilhete: id }
    });

    if (!bilhete) {
      return res.status(404).json({
        message: "Bilhete não encontrado."
      });
    }

    // admin
    if (decoded.role !== "admin") {

      const pessoa = await Pessoa.findOne({
        where: { user_id: decoded.id }
      });

      if (!pessoa || bilhete.id_pessoa !== pessoa.id_pessoa) {
        return res.status(403).json({
          message: "Não autorizado"
        });
      }
    }

    await Bilhete.destroy({ where: { id_bilhete: id } });

    res.status(200).json({
      message: "Bilhete apagado com sucesso."
    });

  } catch (error) {
    res.status(500).json({
      message: "Erro ao apagar bilhete."
    });
  }
};

module.exports = endpoints;