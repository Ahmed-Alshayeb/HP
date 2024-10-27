import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "mysql://urthuiwezbvrseob:idqqcGwzVqLVxVlwpLSk@bs1xtjqlwenxhebtxbtx-mysql.services.clever-cloud.com:3306/bs1xtjqlwenxhebtxbtx",
  {
    dialect: "mysql",
    logging: false,
  }
);

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
