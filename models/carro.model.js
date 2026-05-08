const sequelize = require("sequelize");
const conexao = require("../config/database");
const Pessoa = require("./pessoa.model");

const Carro = conexao.define(
  "carro",
  {
    matricula: {
      type: sequelize.STRING(10),
      primaryKey: true,
    },
    marca: {
      type: sequelize.STRING(50),
      allowNull: false,
    },
    modelo: {
      type: sequelize.STRING(50),
      allowNull: false,
    },
    ano: {
      type: sequelize.SMALLINT,
    },
    img_url: {
      type: sequelize.TEXT,
    },
    id_pessoa: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "carro",
    timestamps: true,
    freezeTableName: true
  }
);


// RELAÇÃO 1:N
// muitos carros - 1 pessoa
Carro.belongsTo(Pessoa, {
  foreignKey: "id_pessoa", // FK na tabela carro
  targetKey: "id_pessoa",         // PK na tabela pessoa
  as: "pessoa",             
});

module.exports = Carro;
const Bilhete = require("./bilhete.model");
Carro.hasMany(Bilhete, {
  foreignKey: "matricula_carro",
  sourceKey: "matricula",
  as: "bilhetes"
});