const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Permission = require("./permission.model");
// const Student = require("./student.model");


const StudentAccount = sequelize.define("StudentAccount", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
  id_quyen: { type: DataTypes.INTEGER, allowNull: false },
  ngay_tao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "taikhoan_hs",
  timestamps: false
});


// Thiết lập quan hệ với bảng quyền
StudentAccount.belongsTo(Permission, { foreignKey: "id_quyen", as: "permission" });

// StudentAccount.hasOne(Student, { foreignKey: 'id_hocsinh', as: 'student' });


module.exports = StudentAccount;
