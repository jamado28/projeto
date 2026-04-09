const sequelize = require("sequelize");
const conexao = require("../config/database");
const Evento = require("./evento.model");

const Pessoa = conexao.define(
  "pessoa",
  {
    nif: {
      type: sequelize.INTEGER,
      primaryKey: true
    },
    nome: {
      type: sequelize.STRING(100),
      allowNull: false
    },
    email: {
      type: sequelize.STRING(100),
      unique: true,
      allowNull: true
    },
    telemovel: {
      type: sequelize.STRING(15),
      allowNull: false
    },
    data_nascimento: {
      type: sequelize.DATEONLY,
      allowNull: false
    },
  },
  {
    tableName: "pessoa",
    timestamps: false,
    freezeTableName: true
  }
);

module.exports = Pessoa;