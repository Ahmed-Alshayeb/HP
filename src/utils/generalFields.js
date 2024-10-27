import joi from "joi";

export const generalFiled = {
  email: joi.string().email({ tlds: { allow: ["outlook", "com"] }, minDomainSegments: 2 }),
  password: joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
  phone: joi.string().regex(/^01[0125][0-9]{8}$/),
  rePassword: joi.string().valid(joi.ref("password")),
  file: joi.object({
    size: joi.number().positive().required(),
    path: joi.string().required(),
    filename: joi.string().required(),
    destination: joi.string().required(),
    mimetype: joi.string().required(),
    encoding: joi.string().required(),
    originalname: joi.string().required(),
    fieldname: joi.string().required(),
  }),
  headers: joi.object({
    cookie: joi.string(),
    "cache-control": joi.string(),
    "postman-token": joi.string(),
    "content-type": joi.string(),
    "content-length": joi.string(),
    host: joi.string(),
    "user-agent": joi.string(),
    accept: joi.string(),
    "accept-encoding": joi.string(),
    connection: joi.string(),
    token: joi.string().required(),
  }),
};
