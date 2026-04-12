const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/config");
const Pessoa = require("../models/pessoa.model");

const endpoints = {};

// REGISTER
endpoints.register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email e password são obrigatórios."
      });
    }

    const existente = await User.findOne({ where: { email } });

    if (existente) {
      return res.status(400).json({
        success: false,
        message: "Email já existe."
      });
    }
    
    // criar user
    const user = await User.create({
      email,
      password,
      role: role || "cliente",
    });

    // se for cliente - criar pessoa automaticamente
    if (user.role === "cliente") {
      await Pessoa.create({
        nif: null,
        nome: null,
        email: user.email,
        telemovel: null,
        data_nascimento: null,
        user_id: user.id,
      });
    }

    res.status(201).json({
      success: true,
      message: "Utilizador criado com sucesso.",
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Erro ao criar utilizador.",
    });
  }
};


// LOGIN
endpoints.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Email ou senha inválidos.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(403).json({
        success: false,
        message: "Email ou senha inválidos.",
      });
    }

    // TOKEN COM ID
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      config.secret,
      { expiresIn: config.timer }
    );

    res.status(200).json({
      success: true,
      message: "Autenticação realizada com sucesso.",
      AccessToken: token,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro no processo de autenticação.",
    });
  }
};


// REFRESH TOKEN
endpoints.refreshToken = async (req, res) => {
  const { token } = req.body;

  try {
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token não fornecido.",
      });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Token inválido ou expirado.",
        });
      }

      const newToken = jwt.sign(
        {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role,
        },
        config.secret,
        { expiresIn: config.timer }
      );

      res.status(200).json({
        success: true,
        message: "Token renovado com sucesso.",
        AccessToken: newToken,
      });
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao renovar token.",
    });
  }
};


// LOGOUT
endpoints.logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logout realizado com sucesso.",
  });
};

//DELETE
endpoints.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    // não existe
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Utilizador não encontrado.",
      });
    }

    // impedir apagar a si próprio
    if (req.decoded.email === user.email) {
      return res.status(400).json({
        status: "error",
        message: "Não pode eliminar o próprio utilizador.",
      });
    }

    await user.destroy();

    return res.status(200).json({
      status: "success",
      message: "Utilizador eliminado com sucesso.",
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Erro ao eliminar utilizador."
    });
  }
};

module.exports = endpoints;