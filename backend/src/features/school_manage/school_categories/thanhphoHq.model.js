const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database'); // Cấu hình kết nối DB

const ThanhphoHq = sequelize.define('ThanhphoHq', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ten_thanhpho: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  korean_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'thanhpho_hq',
  timestamps: false
});

// Xuất model trực tiếp
module.exports = ThanhphoHq;
