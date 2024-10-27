import { Router } from "express";
import * as CC from "./call.controller.js";
import * as CV from "./call.validation.js";
import { validation } from "../../middleware/validation.js";
import { auth } from "../../middleware/auth.js";
import { systemRoles } from "../../utils/systemRoles.js";

const callRouter = Router();

callRouter.get("/", CC.getCalls);

callRouter.get("/:id", auth(Object.values(systemRoles)), CC.getCall);

callRouter.patch("/:id", auth(systemRoles.Doctor), validation(CV.updateCallStatusValidation), CC.updateCallStatus);

callRouter.post(
  "/createCall",
  auth([systemRoles.Receptionist]),
  validation(CV.createCallValidation),
  CC.createCall
);

callRouter.get(
  "/doctorCalls",
  auth([systemRoles.Doctor]),
  validation(CV.doctorCallsValidation),
  CC.doctorCalls
);

export default callRouter;
