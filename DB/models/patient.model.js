import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

const patientModel = sequelize.define("Patient", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM,
    values: ["male", "female"],
    allowNull: false,
  },
  age: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  disease: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default patientModel;
