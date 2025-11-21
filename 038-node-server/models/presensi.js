'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Presensi extends Model {
    /**
     * Helper method for defining associations.
     */
    static associate(models) {
      // define association here
    }
  }
  Presensi.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Ditambahkan: userId tidak boleh null [cite: 102-105]
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false, // Ditambahkan: nama tidak boleh null [cite: 106-109]
    },
    checkIn: {
      type: DataTypes.DATE,
      allowNull: false, // Ditambahkan: checkIn tidak boleh null [cite: 110-113]
    },
    checkOut: {
      type: DataTypes.DATE,
      allowNull: true, // Ditambahkan: checkOut boleh null saat pertama check-in [cite: 114-117]
    }
  }, {
    sequelize,
    modelName: 'Presensi',
  });
  return Presensi;
};