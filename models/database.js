import { Sequelize } from "sequelize";

const playground_db = new Sequelize(
  process.env.DB_NAME || "task_playground",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "password",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
  },
);

export default playground_db;
