import patientModel from "../../../DB/models/patient.model.js";

export const getPatients = async (req, res) => {
  const patients = await patientModel.findAll();
  res.status(200).json({ msg: "success", patients });
};

