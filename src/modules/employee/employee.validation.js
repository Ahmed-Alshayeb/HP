import joi from "joi";
import { systemRoles } from "../../utils/systemRoles.js";
import { generalFiled } from "../../utils/generalFields.js";

export const createEmployeeValidation = {
  body: joi.object({
    name: joi.string().min(3).required(),
    email: generalFiled.email.required(),
    password: generalFiled.password.required(),
    phone: generalFiled.phone.required(),
    address: joi.string().min(5).required(),
    gender: joi.string().valid("male", "female").required(),
    birthdate: joi.date().required(),
    status: joi.string().valid("married", "single").required(),
    role: joi
      .string()
      .valid(...Object.values(systemRoles))
      .required(),
  }),
};

export const loginValidation = {
  body: joi.object({
    email: generalFiled.email.required(),
    password: joi.string().required(),
  }),
};

export const getProfileValidation = {
  headers: generalFiled.headers.required(),
};

export const getDoctorsValidation = {
  headers: generalFiled.headers.required(),
};

export const updateEmployeeValidation = {
  body: joi
    .object({
      name: joi.string().min(3),
      email: generalFiled.email,
      password: generalFiled.password,
      phone: generalFiled.phone,
      address: joi.string().min(5),
      gender: joi.string().valid("male", "female"),
      birthdate: joi.date(),
      status: joi.string().valid("married", "single"),
    })
    .optional(),
  headers: generalFiled.headers.required(),
};
