const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const HocSinh = sequelize.define(
  "HocSinh",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_hocsinh: {
      type: DataTypes.STRING(10),
      unique: true,
    },
    ten_hs: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    gioitinh: {
      type: DataTypes.ENUM("Nam", "Nữ", "Khác"),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
      validate: { isEmail: true },
    },
    sdt: {
      type: DataTypes.STRING(10),
      validate: { isNumeric: true },
    },
    link_fb: {
      type: DataTypes.STRING(255),
    },
    grade_10: {
      type: DataTypes.DECIMAL(4, 2),
      validate: { min: 0.0, max: 10.0 },
    },
    grade_11: {
      type: DataTypes.DECIMAL(4, 2),
      validate: { min: 0.0, max: 10.0 },
    },
    grade_12: {
      type: DataTypes.DECIMAL(4, 2),
      validate: { min: 0.0, max: 10.0 },
    },
    id_quanhuyen: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    diachi_chitiet: {
      type: DataTypes.TEXT,
    },
    ngay_dk: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM("Chờ xử lý", "Đã duyệt", "Từ chối"),
      defaultValue: "Chờ xử lý",
    },
  },
  {
    tableName: "hocsinh",
    timestamps: false,
  }
);

module.exports = HocSinh;
