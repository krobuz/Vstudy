const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const City = require("./city.model");

const District = sequelize.define('District', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_tinhthanh: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tinhthanh',
      key: 'id'
    }
  },
  ten_quanhuyen: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'quanhuyen',
  timestamps: false
});

// Quan hệ giữa District và City, Student

District.belongsTo(City, { foreignKey: 'id_tinhthanh', as: 'city' });

module.exports = District;
