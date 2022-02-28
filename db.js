const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "postgres://postgres:fa189337d0b841b6b91f606ce9892354@localhost:5432/grind-house"
);

module.exports = sequelize;