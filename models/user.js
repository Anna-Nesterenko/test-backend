const Joi = require("joi");

// Define the schema for validating user data during user creation
const userSchema = Joi.object({
  login: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  first_name: Joi.string().min(2).required(),
  last_name: Joi.string().min(2).required(),
  role: Joi.string().valid("admin", "user"),
  department_id: Joi.number().integer().valid(101, 102, 103),
  position: Joi.string().min(2),
});

// Define the login schema for validation
const loginSchema = Joi.object({
  login: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  userSchema,
  loginSchema,
};

module.exports = { schemas };