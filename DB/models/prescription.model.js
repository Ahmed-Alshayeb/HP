import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

const prescriptionModel = sequelize.define("Prescription", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  doctor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Employee",
      key: "id",
    },
  },
  patient: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Patient",
      key: "id",
    },
  },
  age: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  midicines: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default prescriptionModel;
