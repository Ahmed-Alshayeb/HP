import { Router } from "express";
import { getPrescriptions } from "./prescription.controller.js";

const prescriptionRouter = Router();

prescriptionRouter.get("/", getPrescriptions);

export default prescriptionRouter;
