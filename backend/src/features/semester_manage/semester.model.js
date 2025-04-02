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
    tableName: "ky_hoc", // Đảm bảo đúng tên bảng trong DB
    timestamps: false, // Nếu bảng không có createdAt và updatedAt
  }
);

module.exports = Semester;