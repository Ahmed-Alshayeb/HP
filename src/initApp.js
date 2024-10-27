import dotEnv from "dotenv";
import connectionDB from "../DB/connection.js";
import * as routes from "./modules/index.routes.js";

export const initApp = async (express, app) => {
  dotEnv.config();

  const port = +process.env.PORT || 8000;

  app.use(express.json());
  connectionDB();

  app.use("/api/v1/employee", routes.employeeRouter);
  app.use("/api/v1/patient", routes.patientRouter);
  app.use("/api/v1/call", routes.callRouter);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("*", (req, res) => {
    res.status(404).json({ msg: `Route ${req.originalUrl} Not Found` });
  });

  // Globel Error Handling
  app.use((err, req, res, next) => {
    res.status(err.code || 400).json({ msg: "erro", error: err.message });
  });

  app.listen(port, () => {
    console.log(`server listening on port ${port}!`);
  });
};
