import { Sequelize } from "sequelize";

const playground_db = new Sequelize("task_playground", "root", "password", {
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT || 3306,
  dialect: "mysql",
  pool: {
    min: 0,
    max: 2,
    acquire: 60000,
    idle: 10000,
  },
});

export default playground_db;
