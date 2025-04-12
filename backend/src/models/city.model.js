const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


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


module.exports = City;
