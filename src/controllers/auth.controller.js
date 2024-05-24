const Auth = require('../models/auth.model')
const bcrypt = require('bcrypt')
const { v4: uuid_v4 } = require("uuid")
const { signJWT } = require('../utils/jwt')

const register = async (req, res) => {
  try {
    req.body.userId = uuid_v4();
    req.body.password = bcrypt.hashSync(req.body.password, 10)
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
    const isValid = bcrypt.compareSync(password, auth.password);
    if (!isValid) {
      res.status(401).json({ message: "Invalid credentials" });
    }
    const accessToken = signJWT({ ...auth }, { expiresIn: "1d" });
    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register, login
}