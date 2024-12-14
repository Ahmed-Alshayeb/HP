import { Router } from "express";
import * as PC from "./prescription.controller.js";
import { auth } from "../../middleware/auth.js";
import { systemRoles } from "../../utils/systemRoles.js";

const prescriptionRouter = Router();

prescriptionRouter.get("/", PC.getPrescriptions);
prescriptionRouter.get("/:id", PC.getPrescription);
prescriptionRouter.post("/create", auth(systemRoles.Doctor), PC.createPrescription);
prescriptionRouter.post("/get/patient/:id", auth(Object.values(systemRoles)), PC.getPatientPrescription);

export default prescriptionRouter;
