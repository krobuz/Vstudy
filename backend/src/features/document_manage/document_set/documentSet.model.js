const { DataTypes } = require("sequelize");
const sequelize = require('../../../config/database');
const HocSinh = require('../../../models/student.model');

const BoHoso = sequelize.define("BoHoso", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ten_bo_hoso: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  ngay_tao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM("Đang chuẩn bị", "Đã nộp", "Đã duyệt", "Từ chối"),
    defaultValue: "Đang chuẩn bị",
  },
  id_hocsinh: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: HocSinh,
      key: 'id_hocsinh',
    },
  },
}, {
  tableName: 'bo_hoso',
  timestamps: false,
});

// Quan hệ với bảng học sinh
BoHoso.belongsTo(HocSinh, { foreignKey: 'id_hocsinh', as: 'hoc_sinh' });

module.exports = BoHoso;
