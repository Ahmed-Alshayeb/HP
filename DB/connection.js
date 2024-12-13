import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

export const sequelize = new Sequelize({
  host: "bpwb62evoeytpvjsquzk-mysql.services.clever-cloud.com",
  port: 3306,
  username: "bpwb62evoeytpvjsquzk",
  password: "a8bUs7nTz5dLBdgdJv9t",
  database: "bpwb62evoeytpvjsquzk",
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
