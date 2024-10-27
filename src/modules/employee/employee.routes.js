import { Router } from "express";
import * as EC from "./employee.controller.js";
import * as EV from "./employee.validation.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { systemRoles } from "../../utils/systemRoles.js";

const employeeRouter = Router();

employeeRouter.get("/verify/:token", EC.verifyEmail);

employeeRouter.get(
  "/",
  auth([systemRoles.Admin, systemRoles.Manager, systemRoles.Receptionist]),
  EC.getEmployees
);

employeeRouter.post("/login", validation(EV.loginValidation), EC.login);

employeeRouter.post("/createEmployee", validation(EV.createEmployeeValidation), EC.createEmployee);

employeeRouter.get(
  "/profile",
  auth(Object.values(systemRoles)),
  validation(EV.getProfileValidation),
  EC.getProfile
);

employeeRouter.get(
  "/getDoctors",
  auth(Object.values(systemRoles)),
  validation(EV.getDoctorsValidation),
  EC.getDoctors
);

employeeRouter.patch(
  "/",
  auth(Object.values(systemRoles)),
  validation(EV.updateEmployeeValidation),
  EC.updateEmployee
);

export default employeeRouter;
