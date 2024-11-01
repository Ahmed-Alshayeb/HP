import { Router } from "express";
import * as EC from "./employee.controller.js";
import * as EV from "./employee.validation.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { systemRoles } from "../../utils/systemRoles.js";
import { multerHost, validExtension }  from "../../middleware/uploadImage.js";

const employeeRouter = Router();

employeeRouter.get("/verify/:token", EC.verifyEmail);

employeeRouter.get(
  "/",
  auth([systemRoles.Admin, systemRoles.Manager, systemRoles.Receptionist]),
  EC.getEmployees
);

employeeRouter.post("/login", validation(EV.loginValidation), EC.login);

employeeRouter.post(
  "/createEmployee",
  multerHost(validExtension.image).single("avatar"),
  validation(EV.createEmployeeValidation),
  EC.createEmployee
);

employeeRouter.get("/profile", auth(Object.values(systemRoles)), EC.getProfile);

employeeRouter.get("/getDoctors", auth(Object.values(systemRoles)), EC.getDoctors);

employeeRouter.patch(
  "/",
  auth(Object.values(systemRoles)),
  multerHost(validExtension.image).single("avatar"),
  validation(EV.updateEmployeeValidation),
  EC.updateEmployee
);

export default employeeRouter;
