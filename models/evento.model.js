const sequelize = require("sequelize");
const conexao = require("../config/database");
const Pessoa = require("./pessoa.model");

const Evento = conexao.define(
  "evento",
  {
    id_evento: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: sequelize.STRING(150),
      allowNull: false
    },
    data: {
      type: sequelize.DATEONLY,
      allowNull: false
    },
    local_evento: {
      type: sequelize.STRING(255),
      allowNull: false
    },
    preco_visitante: {
      type: sequelize.DECIMAL(8, 2),
      validate: { min: 0 },
      allowNull: true
    },
    preco_participante: {
      type: sequelize.DECIMAL(8, 2),
      validate: { min: 0 },
      allowNull: true
    },
    limite_participantes: {
      type: sequelize.INTEGER,
      allowNull: false
    },
    user_id: {
      type: sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: "evento",
    timestamps: true,
    freezeTableName: true
  }
);

module.exports = Evento;

