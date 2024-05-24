const jwt = require('jsonwebtoken')
const CONFIG = require('../config/environment')

const signJWT = (payload, options) => {
  return jwt.sign(payload, CONFIG.jwt_private, {
    ...(options && options),
    algorithm: 'RS256'
  })
}

module.exports = {
  signJWT
}