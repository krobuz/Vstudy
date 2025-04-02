const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const DmThu = sequelize.define("DmThu", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      loai_thu: {
        type: DataTypes.STRING,
        allowNull: false,
      }
}, {
  tableName: "dm_thu", 
  timestamps: false 
});

module.exports = DmThu;
