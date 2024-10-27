import { Router } from "express";
import { getPatients } from "./patient.controller.js";


const patientRouter = Router();

patientRouter.get("/", getPatients);


export default patientRouter;
