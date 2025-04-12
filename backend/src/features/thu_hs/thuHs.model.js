const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const DmThu = require("../dm_thu/dmThu.model");
const HocSinh = require('../../models/student.model');

const ThuHs = sequelize.define('ThuHs', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_dm_thu: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'dm_thu',
      key: 'id'
    }
  },
  id_hocsinh: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'hocsinh',
      key: 'id_hocsinh'
    }
  },
  noi_dung: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  so_tien: {
    type: DataTypes.DECIMAL(15,2),
    allowNull: false
  },
  ngay_thu: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'thu_hs',
  timestamps: false
});

// Thiết lập quan hệ
ThuHs.belongsTo(DmThu, { foreignKey: 'id_dm_thu', as: 'loai_thu' });
ThuHs.belongsTo(HocSinh, { foreignKey: 'id_hocsinh', as: 'hoc_sinh' });

module.exports = ThuHs;
