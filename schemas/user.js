const Joi = require("joi");

/**
 * Joi schema for creating a new user.
 * Specifies the shape and validation rules for user data during user creation.
 *
 * @property {string} login - The login username (minimum length: 3 characters, required).
 * @property {string} password - The user password (minimum length: 6 characters, required).
 * @property {string} first_name - The first name of the user (minimum length: 2 characters, required).
 * @property {string} last_name - The last name of the user (minimum length: 2 characters, required).
 * @property {string} role - The user role ("admin" or "user").
 * @property {number} department_id - The ID of the user's department (integer, valid values: 101, 102, 103).
 * @property {string} position - The position of the user (minimum length: 2 characters).
 */

const createUserSchema = Joi.object({
  login: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  first_name: Joi.string().min(2).required(),
  last_name: Joi.string().min(2).required(),
  role: Joi.string().valid("admin", "user"),
  department_id: Joi.number().integer().valid(101, 102, 103),
  position: Joi.string().min(2),
});

/**
 * Joi schema for updating user data.
 * Specifies the shape and validation rules for user data during user updating.
 *
 * @property {string} [first_name] - The updated first name of the user (minimum length: 2 characters).
 * @property {string} [last_name] - The updated last name of the user (minimum length: 2 characters).
 * @property {string} [password] - The updated user password (minimum length: 6 characters).
 * @property {string} [role] - The updated user role ("admin" or "user").
 * @property {number} [department_id] - The updated ID of the user's department (integer, valid values: 101, 102, 103).
 * @property {string} [position] - The updated position of the user (minimum length: 2 characters).
 */

const updateUserSchema = Joi.object({
  first_name: Joi.string().min(2),
  last_name: Joi.string().min(2),
  password: Joi.string().min(6),
  role: Joi.string().valid("admin", "user"),
  department_id: Joi.number().integer().valid(101, 102, 103),
  position: Joi.string().min(2),
});

/**
 * Joi schema for validating user login data.
 * Specifies the shape and validation rules for user login data.
 *
 * @property {string} login - The login username (minimum length: 3 characters, required).
 * @property {string} password - The user password (minimum length: 6 characters, required).
 */

const loginSchema = Joi.object({
  login: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  loginSchema,
};
