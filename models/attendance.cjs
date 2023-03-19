const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Attendance.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    loginTime: {
      type: DataTypes.TIME,
    },
    logoutTime: {
      type: DataTypes.TIME,
    },
  }, {
    sequelize,
    modelName: 'attendances',
  });
  Attendance.sync({ alter: true });
  return Attendance;
};
