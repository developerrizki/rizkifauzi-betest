const Auth = require('../models/auth.model')
const { v4: uuid_v4 } = require("uuid")
const { signJWT } = require('../utils/jwt')
const { hashSyncPassword, checkPassword } = require('../utils/hashing')

const register = async (req, res) => {
  try {
    req.body.userId = uuid_v4();
    req.body.password = hashSyncPassword(req.body.password)
    const auth = await Auth.create(req.body)
    res.status(200).json(auth)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const auth = await Auth.findOne({ email });
    const isValid = checkPassword(password, auth.password)
    if (!isValid) {
      res.status(401).json({ message: "Invalid credentials" })
    }
    const accessToken = signJWT({ ...auth }, { expiresIn: "30d" })
    res.status(200).json({ accessToken: accessToken })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

module.exports = {
  register, login
}