const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Teacher = sequelize.define(
  "Teacher",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ten_giaovien: { type: DataTypes.STRING(100), allowNull: false },
    dob: { type: DataTypes.DATE },
    gioitinh: { type: DataTypes.ENUM("Nam", "Nữ", "Khác") },
    sdt: { type: DataTypes.STRING(10) },
    email: { type: DataTypes.STRING(100), unique: true },
  },
  {
    tableName: "giaovien",
    timestamps: false,
  }
);

module.exports = Teacher;
