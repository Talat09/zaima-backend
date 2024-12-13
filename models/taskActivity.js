const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TaskActivity = sequelize.define("TaskActivity", {
  action: { type: DataTypes.STRING, allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = TaskActivity;
