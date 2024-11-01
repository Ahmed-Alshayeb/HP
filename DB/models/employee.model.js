import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

import { systemRoles } from "../../src/utils/systemRoles.js";

const employeeModel = sequelize.define("Employee", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
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
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM,
    values: Object.values(systemRoles),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM,
    values: ["married", "single"],
    allowNull: false,
  },
  confirmed: {
    type: DataTypes.ENUM("true", "false"),
    allowNull: false,
    defaultValue: "false",
  },
  secure_url: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "https://res.cloudinary.com/dpq8atnxn/image/upload/v1730498228/waghed_d4pxmc.jpg", // Set default path if desired
  },
  public_id: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "default-avatar",
  },
});

export default employeeModel;
