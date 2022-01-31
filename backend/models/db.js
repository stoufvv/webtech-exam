const Sequelize = require("sequelize");
const dbconfig = require("../config/dbconfig.json");

const sequelize = new Sequelize(
  "testdb",
  dbconfig.DB_USERNAME,
  dbconfig.DB_PASSWORD,
  {
    dialect: "mysql",
    logging: false,
    host: "localhost",
    charset: "utf8",
    collate: "utf8_general_ci",
    define: {
      timestamps: false,
    },
    timezone: "+02:00",
  }
);

module.exports = sequelize;