const { Sequelize } = require('sequelize')
const dotenv = require('dotenv').config()
const pg = require('pg')

const sequelize = new Sequelize(
  'postgresql://neondb_owner:MmPYSO2C4JfU@ep-twilight-glade-a59bmdfk.us-east-2.aws.neon.tech/neondb?sslmode=require',
  {
    dialectOptions: {
      ssl: {
        requre: true,
        rejectUnauthorized: false, // <-- Add this line
      },
    },
    dialectModule: pg,
  }
)

try {
  sequelize.authenticate()
  console.log(`Conectado ao banco: ${process.env.dbName}`)
} catch (error) {
  console.log(`Não foi possível conectar ao banco. ${error}`)
}

module.exports = sequelize
