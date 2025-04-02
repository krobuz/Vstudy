const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/database");

const DocumentCategory = sequelize.define("DocumentCategory", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ten_dm_hoso: { type: DataTypes.STRING(100), allowNull: false }
}, {
  tableName: "dm_hoso", // Đảm bảo đúng tên bảng
  timestamps: false // Nếu bảng không có cột `createdAt` và `updatedAt`
});

module.exports = DocumentCategory;
