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
    id_pessoa: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    id_evento: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    tipo: {
      type: sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [["visitante", "participante"]]
      }
    },
    matricula_carro: {
      type: sequelize.STRING(10),
      allowNull: true
    }
  },
  {
    tableName: "bilhete",
    timestamps: true,
    freezeTableName: true
  }
);


// muitos bilhetes - 1 pessoa
Bilhete.belongsTo(Pessoa, {
  foreignKey: "id_pessoa",
  targetKey: "id_pessoa",
  as: "pessoa",
});

// muitos bilhetes - 1 evento
Bilhete.belongsTo(Evento, {
  foreignKey: "id_evento",
  targetKey: "id_evento",
  as: "evento",
  onDelete: "CASCADE"
});


module.exports = Bilhete;

const Carro = require("./carro.model");

Bilhete.belongsTo(Carro, {
  foreignKey: "matricula_carro",
  targetKey: "matricula",
  as: "carro"
});