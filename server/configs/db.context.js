const dbConfig = require('./db.config.js');

const Sequelize = require('sequelize');
const Op = Sequelize.Op; //operator or , and...
const sequelize = new Sequelize(
  dbConfig.postgres.dbName,
  dbConfig.postgres.user,
  dbConfig.postgres.password,
  dbConfig.postgres.options
);

module.exports = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  Op : Op
};
