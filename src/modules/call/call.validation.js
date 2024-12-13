import joi from "joi";
import { generalFiled } from "../../utils/generalFields.js";
import { statusCall } from "../../utils/statusCall.js";

export const createCallValidation = {
  body: joi.object({
    name: joi.string().max(30).required(),
    age: joi.string().max(100).required(),
    phone: generalFiled.phone.required(),
    doctor: joi.number().required(),
    cDescription: joi.string().required(),
    gender: joi.string().valid("male", "female").required(),
    address: joi.string().required(),
  }),
};

export const updateCallStatusValidation = {
  body: joi.object({
    status: joi
      .string()
      .valid(...Object.values(statusCall))
      .required(),
  }),
};
