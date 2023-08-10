const jwt = require("jsonwebtoken");

const { SECRET_KEY_ACCESS, SECRET_KEY_REFRESH } = process.env;

/**
 * Create access and refresh tokens for a user.
 * @param {number} id - The user's ID.
 * @param {string} role - The user's role.
 * @returns {Object} An object containing the generated access and refresh tokens.
 */

const createTokens = async (id, role) => {
  // Prepare the payload for the tokens containing user ID and role
  const payload = {
    id,
    role,
  };

  // Generate an access token with a short expiration time (15 minutes)
  const access_token = jwt.sign(payload, SECRET_KEY_ACCESS, {
    expiresIn: "15m",
  });

  // Generate a refresh token with a longer expiration time (1 day)
  const refresh_token = jwt.sign(payload, SECRET_KEY_REFRESH, {
    expiresIn: "1d",
  });

  return { access_token, refresh_token };
};

module.exports = createTokens;
