const Joi = require("joi");

// Define the signup schema for validation
const signupSchema = Joi.object({
  login: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  first_name: Joi.string().min(2).required(),
  last_name: Joi.string().min(2).required(),
  role: Joi.string().valid("admin", "user").required(),
  department_id: Joi.number().integer().valid(101, 102, 103).required(),
  position: Joi.string().min(2),
});

// Define the login schema for validation
const loginSchema = Joi.object({
  login: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  signupSchema,
  loginSchema,
};

module.exports = { schemas };
