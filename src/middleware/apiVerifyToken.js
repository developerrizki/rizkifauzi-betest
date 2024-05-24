const Auth = require('../models/auth.model')
const { verifyJWT } = require('../utils/jwt')

const apiVerifyToken = async (req, res, next) => {
  const accessToken = req.headers.authorization?.replace('Bearer ', '')
  
  if (!accessToken) {
    return next()
  }

  const token = verifyJWT(accessToken)
  if (token.decoded) {
    res.locals.user = token.decoded;
    return next()
  }

  if (token.expired) {
    return next()
  }

  return next()
}

module.exports = apiVerifyToken