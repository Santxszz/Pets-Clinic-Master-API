const { DataTypes } = require("sequelize");
const db = require("../connect");

const Tutor = require("./Tutor");

const Pet = db.define(
  "Pet",
  {
    name: { type: DataTypes.STRING, allowNull: false, require: true },
    species: { type: DataTypes.STRING, allowNull: false, require: true },
    carry: { type: DataTypes.STRING, allowNull: false, require: true },
    weight: { type: DataTypes.FLOAT, allowNull: false, require: true },
    date_of_birth: { type: DataTypes.DATE, allowNull: false, require: true },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

Tutor.hasMany(Pet);
Pet.belongsTo(Tutor);

module.exports = Pet;
