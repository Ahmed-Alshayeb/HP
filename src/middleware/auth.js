import jwt from "jsonwebtoken";
import employeeModel from "../../DB/models/employee.model.js";
import AppError from "../utils/AppError.js";

export const auth = (role = []) => {
  return async (req, res, next) => {
    const { token } = req.headers;
    if (!token) return next(new AppError("Token not found", 404));

    if (!token.startsWith(process.env.BEERER_TOKEN)) return next(new AppError("Invalid token", 400));

    const newToken = token.split(process.env.BEERER_TOKEN)[1];
    if (!newToken) return next(new AppError("Invalid token", 400));

    const decoded = jwt.verify(newToken, process.env.LOGIN_TOKEN_PK);
    if (!decoded) return next(new AppError("Invalid token", 400));

    const employee = await employeeModel.findByPk(decoded.id);
    if (!employee) return next(new AppError("employee not found", 404));

    if (!role.includes(employee.role)) return next(new AppError("You don't have permission", 401));

    req.employee = employee;
    next();
  };
};
