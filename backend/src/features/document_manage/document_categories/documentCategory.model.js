const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/database");

const DocumentCategory = sequelize.define("DocumentCategory", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ten_dm_hoso: { type: DataTypes.STRING(100), allowNull: false }
}, {
  tableName: "dm_hoso", 
  timestamps: false 
});

module.exports = DocumentCategory;
