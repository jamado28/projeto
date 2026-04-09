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
    pessoa_nif: {
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
  foreignKey: "pessoa_nif", // FK na tabela carro
  targetKey: "nif",         // PK na tabela pessoa
  as: "pessoa",             
});

module.exports = Carro;