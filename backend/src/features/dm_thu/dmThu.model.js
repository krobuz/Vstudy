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
  tableName: "dm_thu", // Đảm bảo đúng tên bảng
  timestamps: false // Nếu bảng không có cột `createdAt` và `updatedAt`
});

module.exports = DmThu;
