const sequelize = require('sequelize');

const conexao = new sequelize(
  'ProjetoP3',
  'postgres',
  'postgres',
  {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false,
  }
);

module.exports = conexao;