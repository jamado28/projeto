const sequelize = require("sequelize");
const conexao = require("../config/database");
const Pessoa = require("./pessoa.model");
const Evento = require("./evento.model");

const Bilhete = conexao.define(
  "bilhete",
  {
    id_bilhete: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ano_bilhete: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    pessoa_nif: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    id_evento: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "bilhete",
    timestamps: true,
    freezeTableName: true
  }
);


// muitos bilhetes - 1 pessoa
Bilhete.belongsTo(Pessoa, {
  foreignKey: "pessoa_nif",
  targetKey: "nif",
  as: "pessoa",
});

// muitos bilhetes - 1 evento
Bilhete.belongsTo(Evento, {
  foreignKey: "id_evento",
  targetKey: "id_evento",
  as: "evento",
});

module.exports = Bilhete;