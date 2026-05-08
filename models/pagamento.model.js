const sequelize = require("sequelize");
const conexao = require("../config/database");
const Bilhete = require("./bilhete.model");

const Pagamento = conexao.define(
  "pagamento",
  {
    id_pagamento: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    iban: {
      type: sequelize.STRING(34),
      allowNull: false
    },
    preco: {
      type: sequelize.DECIMAL(8, 2),
      allowNull: false
    },
    estado: {
      type: sequelize.BOOLEAN,
      allowNull: false
    },
    id_bilhete: {
      type: sequelize.INTEGER,
      allowNull: false,
      unique: true
    },
  },
  {
    tableName: "pagamento",
    timestamps: true,
    freezeTableName: true
  }
);

// pagamento - pertence a um bilhete
Pagamento.belongsTo(Bilhete, {
  foreignKey: "id_bilhete",
  targetKey: "id_bilhete",
  as: "bilhete",
  onDelete: "CASCADE"
});

module.exports = Pagamento;