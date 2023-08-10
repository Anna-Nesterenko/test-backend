const Joi = require("joi");

/**
 * Joi schema for refreshing an access token.
 * Specifies the shape and validation rules for the refresh token object.
 *
 * @property {string} refresh_token.required - The refresh token provided for authentication.
 */

const refreshSchema = Joi.object({
  refresh_token: Joi.string().required(),
});

module.exports = {
  refreshSchema,
};
