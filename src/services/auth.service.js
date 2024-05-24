const Auth = require("../models/auth.model");

const registerUser = async (body) => {
  return Auth.create(body);
}

const getDataAuthByEmail = async (email) => {
  return Auth.findOne({ email });
}

module.exports = {
  registerUser,
  getDataAuthByEmail
};