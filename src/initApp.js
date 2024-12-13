import dotEnv from "dotenv";
import * as routes from "./modules/index.routes.js";
import connection from "../DB/connection.js";

export const initApp = async (express, app) => {
  dotEnv.config();

  const port = +process.env.PORT || 8000;

  app.use(express.json());

  connection();

  app.use("/api/v1/employee", routes.employeeRouter);
  app.use("/api/v1/patient", routes.patientRouter);
  app.use("/api/v1/call", routes.callRouter);
  app.use("/api/v1/prescription", routes.prescriptionRouter);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("*", (req, res) => {
    res.status(404).json({ msg: `Route ${req.originalUrl} Not Found` });
  });

  // Globel Error Handling
  app.use((err, req, res, next) => {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  });

  app.listen(port, () => {
    console.log(`server listening on port ${port}!`);
  });
};
