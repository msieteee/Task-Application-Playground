import { DataTypes } from "sequelize";
import playground_db from "./database.js";
import User from "./user.js";

const TaskInfo = playground_db.define(
  "TaskInfo",
  {
    task_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    task: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "task_info",
    timestamps: false,
  },
);

TaskInfo.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

export default TaskInfo;
