const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/database");
const BoHoso = require("../document_set/documentSet.model");
const DmHoso = require("../document_categories/documentCategory.model");

const HoSo = sequelize.define("HoSo", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_bo_hoso: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: BoHoso,
      key: 'id',
    },
  },
  id_dm_hoso: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: DmHoso,
      key: 'id',
    },
  },
  link: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  index_trang: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ngay_up: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  ngay_sua: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'ho_so',
  timestamps: false,
});

// Quan hệ với bảng bo_hoso và dm_hoso
HoSo.belongsTo(BoHoso, { foreignKey: 'id_bo_hoso', as: 'bo_hoso' });
HoSo.belongsTo(DmHoso, { foreignKey: 'id_dm_hoso', as: 'dm_hoso' });

module.exports = HoSo;
