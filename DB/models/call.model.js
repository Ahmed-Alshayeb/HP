import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import { statusCall } from "../../src/utils/statusCall.js";

const callModel = sequelize.define("Call", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  doctor: {
    type: DataTypes.INTEGER,
    references: {
      model: "Employees",
      key: "id",
    },
  },
  cDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM,
    values: Object.values(statusCall),
    allowNull: false,
    defaultValue: statusCall.InProgress,
  },
});


export default callModel;
