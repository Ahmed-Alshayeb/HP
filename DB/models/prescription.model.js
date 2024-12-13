import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

const prescriptionModel = sequelize.define(
  "Prescription",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    doctor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Employees",
        key: "id",
      },
    },
    patient: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Patients",
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
    medicines: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default prescriptionModel;
