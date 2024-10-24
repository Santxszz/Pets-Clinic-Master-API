const { Sequelize } = require("sequelize");
const dotenv = require("dotenv").config();

const sequelize = new Sequelize(`${process.env.dbHost}`, {
  dialectOptions: {
    ssl: {
      requre: true,
      rejectUnauthorized: false, // <-- Add this line
    }
  }
});

try {
  sequelize.authenticate();
  console.log(`Conectado ao banco: ${process.env.dbName}`);
} catch (error) {
  console.log(`Não foi possível conectar ao banco. ${error}`);
}

module.exports = sequelize;
