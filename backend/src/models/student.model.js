const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Import các model liên quan
const StudentAccount = require("./studentAccount.model");
const District = require("./district.model");

const Student = sequelize.define("Student", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_hocsinh: { type: DataTypes.INTEGER, unique: true },
  ten_hs: { type: DataTypes.STRING(100), allowNull: false },
  dob: { type: DataTypes.DATE, allowNull: true },
  gioitinh: { type: DataTypes.ENUM("Nam", "Nữ", "Khác"), allowNull: true },
  email: { type: DataTypes.STRING(100), allowNull: true },
  sdt: { type: DataTypes.STRING(10), allowNull: true },
  link_fb: { type: DataTypes.STRING(255), allowNull: true },
  grade_10: { type: DataTypes.DECIMAL(4, 2), validate: { min: 0, max: 10 }, allowNull: true },
  grade_11: { type: DataTypes.DECIMAL(4, 2), validate: { min: 0, max: 10 }, allowNull: true },
  grade_12: { type: DataTypes.DECIMAL(4, 2), validate: { min: 0, max: 10 }, allowNull: true },
  id_quanhuyen: { type: DataTypes.INTEGER, allowNull: true },
  diachi_chitiet: { type: DataTypes.TEXT, allowNull: true },
  ngay_dk: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  status: { type: DataTypes.ENUM("Chờ xử lý", "Đã duyệt", "Từ chối"), defaultValue: "Chờ xử lý" }
}, {
  tableName: "hocsinh",
  timestamps: false
});

// Thiết lập quan hệ với bảng tài khoản học sinh
Student.belongsTo(StudentAccount, { foreignKey: "id_hocsinh", as: "account" });

// Thiết lập quan hệ với bảng quận/huyện
Student.belongsTo(District, { foreignKey: "id_quanhuyen", as: "district" });

module.exports = Student;
