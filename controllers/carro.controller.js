const Carro = require("../models/carro.model");
const Pessoa = require("../models/pessoa.model");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const Bilhete = require("../models/bilhete.model");
const Evento = require("../models/evento.model");

const endpoints = {};


// CREATE
endpoints.createCarro = async (req, res) => {
  const { matricula, marca, modelo, ano, img_url, id_pessoa } = req.body;

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token não fornecido"
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.secret);

    // organizador não pode
    if (decoded.role !== "cliente") {
      return res.status(403).json({
        message: "Apenas clientes podem criar carros"
      });
    }

    // buscar pessoa do user
    const pessoa = await Pessoa.findOne({
      where: { user_id: decoded.id }
    });

    if (!pessoa) {
      return res.status(404).json({
        message: "Pessoa não encontrada"
      });
    }

    // evitar duplicado
    const existe = await Carro.findOne({ where: { matricula } });
    if (existe) {
      return res.status(400).json({
        message: "Já existe um carro com essa matrícula"
      });
    }

    const dados = await Carro.create({
      matricula,
      marca,
      modelo,
      ano,
      img_url,
      id_pessoa: pessoa.id_pessoa,
    });

    res.status(201).json({
      status: "success",
      message: "Carro criado com sucesso.",
      data: dados,
    });

  } catch (error) {
    res.status(500).json({
      message: "Erro ao criar carro."
    });
  }
};


// GET ALL
endpoints.getAllCarros = async (req, res) => {
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

    // ADMIN - vê tudo
    if (decoded.role === "admin") {
      dados = await Carro.findAll({
        include: {
          model: Pessoa,
          as: "pessoa",
          attributes: ["id_pessoa", "nome"]
        }
      });
    }

    // CLIENTE - só os seus carros
    else if (decoded.role === "cliente") {

      const pessoa = await Pessoa.findOne({
        where: { user_id: decoded.id }
      });

      dados = await Carro.findAll({
        where: { id_pessoa: pessoa.id_pessoa },
        include: {
          model: Pessoa,
          as: "pessoa",
          attributes: ["id_pessoa", "nome"]
        }
      });
    }

    // ORGANIZADOR - carros dos seus eventos
    else {

      dados = await Carro.findAll({
        include: [
          {
            model: Pessoa,
            as: "pessoa",
            attributes: ["id_pessoa", "nome"]
          },
          {
            model: Bilhete,
            as: "bilhetes",
            required: true,
            include: {
              model: Evento,
              as: "evento",
              where: { user_id: decoded.id }
            }
          }
        ]
      });
    }

    res.status(200).json({
      status: "success",
      message: "Lista de carros.",
      data: dados,
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao listar carros.",
    });
  }
};


// GET BY ID (matricula)
endpoints.getCarroById = async (req, res) => {
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

    const carro = await Carro.findOne({
      where: { matricula: id },
      include: {
        model: Pessoa,
        as: "pessoa"
      }
    });

    if (!carro) {
      return res.status(404).json({
        message: "Carro não encontrado."
      });
    }

    // admin pode tudo
    if (decoded.role === "admin") {
      return res.json(carro);
    }

    // dono
    const pessoa = await Pessoa.findOne({
      where: { user_id: decoded.id }
    });

    if (pessoa && carro.id_pessoa === pessoa.id_pessoa) {
      return res.json(carro);
    }

    // organizador - carros dos seus eventos
    const bilhete = await Bilhete.findOne({
      where: {
        matricula_carro: carro.matricula
      },
      include: {
        model: Evento,
        as: "evento",
        where: { user_id: decoded.id }
      }
    });

    if (bilhete) {
      return res.json(carro);
    }

    return res.status(403).json({
      message: "Não autorizado"
    });

  } catch (error) {
    res.status(500).json({
      message: "Erro ao procurar carro."
    });
  }
};

// UPDATE
endpoints.updateCarro = async (req, res) => {
  const { id } = req.params;
  const { marca, modelo, ano, img_url } = req.body;

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token não fornecido"
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.secret);

    const carro = await Carro.findOne({
      where: { matricula: id }
    });

    if (!carro) {
      return res.status(404).json({
        message: "Carro não encontrado."
      });
    }

    // admin pode tudo
    if (decoded.role !== "admin") {

      const pessoa = await Pessoa.findOne({
        where: { user_id: decoded.id }
      });

      if (!pessoa || carro.id_pessoa !== pessoa.id_pessoa) {
        return res.status(403).json({
          message: "Não autorizado"
        });
      }
    }

    await Carro.update(
      { marca, modelo, ano, img_url },
      { where: { matricula: id } }
    );

    res.status(200).json({
      message: "Carro atualizado com sucesso."
    });

  } catch (error) {
    res.status(500).json({
      message: "Erro ao atualizar carro."
    });
  }
};


// DELETE
endpoints.deleteCarro = async (req, res) => {
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

    const carro = await Carro.findOne({
      where: { matricula: id }
    });

    if (!carro) {
      return res.status(404).json({
        message: "Carro não encontrado."
      });
    }

    // admin pode tudo
    if (decoded.role !== "admin") {

      const pessoa = await Pessoa.findOne({
        where: { user_id: decoded.id }
      });

      if (!pessoa || carro.id_pessoa !== pessoa.id_pessoa) {
        return res.status(403).json({
          message: "Não autorizado"
        });
      }
    }

    await Carro.destroy({ where: { matricula: id } });

    res.status(200).json({
      message: "Carro apagado com sucesso."
    });

  } catch (error) {
    res.status(500).json({
      message: "Erro ao apagar carro."
    });
  }
};

module.exports = endpoints;