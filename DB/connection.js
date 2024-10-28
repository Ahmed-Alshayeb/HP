import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  host: "bs1xtjqlwenxhebtxbtx-mysql.services.clever-cloud.com",
  port: 3306,
  username: "urthuiwezbvrseob",
  password: "idqqcGwzVqLVxVlwpLSk",
  database: "bs1xtjqlwenxhebtxbtx",
  dialect: "mysql",
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
