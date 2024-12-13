import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

import dotEnv from "dotenv";
dotEnv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URI, {
  dialect: "mysql",
  dialectModule: mysql2,
});

const connectionDB = async () => {
  await sequelize
    .sync()
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
};

export default connectionDB;
