// models/permission.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
  
const Permission = sequelize.define("Permission", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ten_quyen: { type: DataTypes.STRING(50), allowNull: false }
}, {
  tableName: "quyen",
  timestamps: false
});

module.exports = Permission;