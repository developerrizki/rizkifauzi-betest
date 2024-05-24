const jwt = require('jsonwebtoken')
const CONFIG = require('../config/environment')

const signJWT = (payload, options) => {
  return jwt.sign(payload, CONFIG.jwt_private, {
    ...(options && options),
    algorithm: 'RS256'
  })
}

const verifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, CONFIG.jwt_public)
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error) {
    return {
      valid: false,
      expired: error.message === "jwt is expired or not eligible to use",
      decoded: null
    };
  }
}

module.exports = {
  signJWT,
  verifyJWT
};