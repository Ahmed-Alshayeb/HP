import employeeModel from "../../../DB/models/employee.model.js";
import patientModel from "../../../DB/models/patient.model.js";
import prescriptionModel from "../../../DB/models/prescription.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

// @desc    get all prescription
// @route   GET /api/v1/prescription/
// @access  Private
export const getPrescriptions = asyncHandler(async (req, res) => {
  const prescriptions = await prescriptionModel.findAll();
  res.status(200).json({ msg: "success", count: prescriptions.length, prescriptions });
});

// @desc    get single prescription
// @route   GET /api/v1/prescription/:id
// @access  Private
export const getPrescription = asyncHandler(async (req, res) => {
  const prescriptions = await prescriptionModel.findOne({ where: { id: req.params.id } });
  if (!prescriptions) return next(new AppError("prescription not found", 404));
  res.status(200).json({ msg: "success", count: prescriptions.length, prescriptions });
});

// @desc    create prescription
// @route   POST /api/v1/prescription/create
// @access  Private
export const createPrescription = asyncHandler(async (req, res, next) => {
  const { patient, description, medicines } = req.body;
  const doctor = req.employee.id;

  const checkDoctor = await employeeModel.findOne({ where: { id: doctor, role: "Doctor" } });
  if (!checkDoctor) return next(new AppError("doctor not found", 404));

  const checkPatient = await patientModel.findOne({ where: { id: patient } });
  if (!checkPatient) return next(new AppError("patient not found", 404));

  const prescription = await prescriptionModel.create({
    name: checkPatient.name,
    doctor: doctor,
    patient,
    age: checkPatient.age,
    description,
    medicines,
  });

  res.status(201).json({ msg: "success", prescription });
});

// @desc    get patient prescription
// @route   POST /api/v1/prescription/get/patient/:id
// @access  Private
export const getPatientPrescription = asyncHandler(async (req, res, next) => {
  const prescription = await prescriptionModel.findAll({ where: { patient: req.params.id } });
  res.status(201).json({ msg: "success", count: prescription.length, prescription });
});
