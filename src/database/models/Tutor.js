const { DataTypes } = require("sequelize");
const db = require("../connect");

const Tutor = db.define(
  "Tutor",
  {
    name: { type: DataTypes.STRING, allowNull: false, require: true },
    phone: { type: DataTypes.STRING, allowNull: false, require: true },
    email: { type: DataTypes.STRING, allowNull: false, require: true },
    date_of_birth: { type: DataTypes.DATE, allowNull: false, require: true },
    zip_code: { type: DataTypes.STRING, allowNull: false, require: true },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Tutor;
