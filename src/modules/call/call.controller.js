import callModel from "../../../DB/models/call.model.js";
import employeeModel from "../../../DB/models/employee.model.js";
import AppError from "../../utils/AppError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

// @desc    get all calls
// @route   GET /api/v1/call
// @access  Private
export const getCalls = asyncHandler(async (req, res, next) => {
  const calls = await callModel.findAll({});
  res.status(200).json({ msg: "success", calls });
});

// @desc    get call
// @route   GET /api/v1/call/:id
// @access  Private
export const getCall = asyncHandler(async (req, res, next) => {
  const call = await callModel.findByPk(req.params.id);
  if (!call) return next(new AppError("call not found", 404));

  res.status(200).json({ msg: "success", call });
});

// @desc    get all calls
// @route   POST /api/v1/call/createCall
// @access  Private
export const createCall = asyncHandler(async (req, res, next) => {
  const { name, age, phone, doctor, cDescription } = req.body;

  const checkDoctor = await employeeModel.findOne({ where: { id: doctor, role: "Doctor" } });
  if (!checkDoctor) return next(new AppError("doctor not found", 404));

  const call = await callModel.create({
    name,
    age,
    phone,
    doctor,
    cDescription,
  });

  res.status(201).json({ msg: "success", call });
});

// @desc    get all calls for doctor
// @route   GET /api/v1/call/doctorCalls
// @access  Private
export const doctorCalls = asyncHandler(async (req, res, next) => {
  const calls = await callModel.findAll({ where: { doctor: req.employee.id } });
  res.status(201).json({ msg: "success", calls });
});

// @desc    get all calls for doctor
// @route   GET /api/v1/call/doctorCalls
// @access  Private
export const updateCallStatus = asyncHandler(async (req, res, next) => {
  const call = await callModel.update({ status: req.body.status }, { where: { id: req.params.id } });
  res.status(201).json({ msg: "success", call });
});
