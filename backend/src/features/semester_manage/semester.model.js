const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Semester = sequelize.define(
  "Semester",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ten_kyhoc: { type: DataTypes.STRING(50), allowNull: false },
    ngaybd: { type: DataTypes.DATE, allowNull: false },
    ngaykt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    tableName: "ky_hoc", 
    timestamps: false,
  }
);

module.exports = Semester;