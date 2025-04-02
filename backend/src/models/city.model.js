const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// const District = require("./district.model");


const City = sequelize.define('City', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ten_tinhthanh: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'tinhthanh',
  timestamps: false
});

// Quan hệ giữa City và District
// City.associate = (models) => {
//   City.hasMany(models.District, { foreignKey: 'id_tinhthanh', as: 'districts' });
// };

// City.hasMany(District, { foreignKey: 'id_city', as: 'districts' });

module.exports = City;
