import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import employeeModel from "../../../DB/models/employee.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendEmail } from "../../services/sendmail.service.js";
import AppError from "../../utils/AppError.js";
import cloudinary from "../../services/cloudinary.service.js";
import { defaultURL } from "../../utils/defaultURL.js";

// @desc    get all employees
// @route   GET /api/v1/employee
// @access  Public
export const getEmployees = asyncHandler(async (req, res, next) => {
  const employees = await employeeModel.findAll();
  res.status(200).json({ msg: "success", employees });
});

// @desc    create employee
// @route   POST /api/v1/employee/createEmployee
// @access  Private
export const createEmployee = asyncHandler(async (req, res, next) => {
  const { name, email, password, phone, address, gender, birthdate, status, role } = req.body;

  // check email
  const existingEmployee = await employeeModel.findOne({ where: { email } });
  if (existingEmployee) return next(new AppError("email already exists", 400));

  // hash password
  const hash = bcrypt.hashSync(password, +process.env.SALT_ROUNDS);

  // send verification email
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // upload image
  let secure_url, public_id;

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: `Hospital/Employee/${email}`,
    });
    secure_url = result.secure_url;
    public_id = result.public_id;
  } else {
    const result = await cloudinary.uploader.upload(defaultURL, {
      folder: `Hospital/Employee/${email}`,
    });
    secure_url = defaultURL;
    public_id = "Default-image";
  }

  const link = `${req.protocol}://${req.get("host")}/api/v1/employee/verify/${token}`;
  await sendEmail(email, "Verification Email", link);

  const employee = await employeeModel.create({
    name,
    email,
    phone,
    password: hash,
    address,
    gender,
    birthdate,
    status,
    secure_url,
    public_id,
    role,
  });

  res.status(201).json({ msg: "success", employee });
});

// @desc    verify email
// @route   GET /api/v1/employee/verify/:token
// @access  Private
export const verifyEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const employee = await employeeModel.update({ confirmed: "true" }, { where: { email: decoded.email } });
  if (!employee) return next(new AppError("invalid token", 400));

  res.status(200).json({ msg: "verification successful" });
});

// @desc    login
// @route   POST /api/v1/employee/login
// @access  Private
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const employee = await employeeModel.findOne({ where: { email } });
  if (!employee) return next(new AppError("employee not found", 404));

  const matchedPass = bcrypt.compareSync(password, employee.password);
  if (!matchedPass) return next(new AppError("invalid password", 400));

  const token = jwt.sign({ id: employee.id, email }, process.env.LOGIN_TOKEN_PK, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res
    .status(200)
    .json({ msg: "success", token, name: employee.name, role: employee.role, image: employee.secure_url });
});

// @desc    get profile
// @route   GET /api/v1/employee/profile
// @access  Private
export const getProfile = asyncHandler(async (req, res, next) => {
  res.status(200).json({ msg: "success", employee: req.employee });
});

// @desc    get doctors
// @route   GET /api/v1/employee/getDoctors
// @access  Private
export const getDoctors = asyncHandler(async (req, res, next) => {
  const doctors = await employeeModel.findAll({ where: { role: "Doctor" } });
  res.status(200).json({ msg: "success", doctors });
});

// @desc    updateEmployee
// @route   PATCH /api/v1/employee
// @access  Private
export const updateEmployee = asyncHandler(async (req, res, next) => {
  const { name, email, phone, address, gender, birthdate, status } = req.body;

  if (email) {
    const employee = await employeeModel.findOne({ where: { email } });
    if (employee) return next(new AppError("email already exists", 400));
  }

  // update employee image
  if (req.file) {
    await cloudinary.uploader.destroy(req.employee.public_id);
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: `Hospital/Employee/${req.employee.email}`,
    });

    const newEmployee = await employeeModel.update(
      {
        name,
        email,
        phone,
        address,
        gender,
        birthdate,
        status,
        secure_url: result.secure_url,
        public_id: result.public_id,
      },
      { where: { id: req.employee.id } }
    );
  }

  const newEmployee = await employeeModel.update(
    { name, email, phone, address, gender, birthdate, status },
    { where: { id: req.employee.id } }
  );

  res.status(200).json({ msg: "success", newEmployee });
});
