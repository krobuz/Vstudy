const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');
const ThanhPhoHq = require('./thanhphoHq.model'); // Import model thành phố Hàn Quốc

const TruongHq = sequelize.define('TruongHq', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_thanhpho: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'thanhpho_hq',
      key: 'id'
    }
  },
  ten_truong_hq: {
    type: DataTypes.STRING,
    allowNull: false
  },
  korean_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  xep_hang: {
    type: DataTypes.TINYINT,
    allowNull: true
  }
}, {
  tableName: 'truong_hq',
  timestamps: false
});

// Khai báo quan hệ
TruongHq.belongsTo(ThanhPhoHq, { foreignKey: 'id_thanhpho', as: 'city' });

module.exports = TruongHq; // ✅ Xuất model trực tiếp
