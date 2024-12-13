const sequelize = require("../config/database");
const User = require("./User");
const Task = require("./Task");
const Role = require("./Role");
const TaskActivity = require("./TaskActivity");

// Associations
User.hasMany(Task);
Task.belongsTo(User);

Task.hasMany(TaskActivity);
TaskActivity.belongsTo(Task);

User.belongsToMany(Role, { through: "UserRoles" });
Role.belongsToMany(User, { through: "UserRoles" });

module.exports = { sequelize, User, Task, Role, TaskActivity };
