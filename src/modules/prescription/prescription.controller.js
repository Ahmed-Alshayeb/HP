import prescriptionModel from "../../../DB/models/prescription.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const getPrescriptions = asyncHandler(async (req, res) => {
  const prescriptions = await prescriptionModel.findAll();
  res.status(200).json({ msg: "success", prescriptions });
});
