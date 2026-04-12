const sequelize = require("sequelize");
const conexao = require("../config/database");
const Evento = require("./evento.model");
const User = require("./user.model");

const Pessoa = conexao.define(
  "pessoa",
  {
    id_pessoa: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nif: {
      type: sequelize.INTEGER,
      allowNull: true,
      unique: true
    },
    nome: {
      type: sequelize.STRING(100),
      allowNull: true
    },
    email: {
      type: sequelize.STRING(100),
      unique: true,
      allowNull: true
    },
    telemovel: {
      type: sequelize.STRING(15),
      allowNull: true
    },
    data_nascimento: {
      type: sequelize.DATEONLY,
      allowNull: true
    },
    user_id: {
      type: sequelize.INTEGER,
      allowNull: false,
      unique: true
    }
  },
  {
    tableName: "pessoa",
    timestamps: false,
    freezeTableName: true
  }
);

User.hasOne(Pessoa, { foreignKey: "user_id" });
Pessoa.belongsTo(User, { foreignKey: "user_id" });

module.exports = Pessoa;