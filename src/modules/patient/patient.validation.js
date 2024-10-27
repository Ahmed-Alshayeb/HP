import joi from "joi";

export const signUpValidation = {
  body: joi.object({}),
  query: joi.object({}),
  params: joi.object({}),
};
