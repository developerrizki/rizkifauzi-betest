const User = require('../models/user.model')

const getAllUser = async() => {
  return User.find({})
}

const getUserByIdFromDB = async (id) => {
  return User.findById(id);
};

const getUserByIdentityOrAccountNumberFromDB = async (number) => {
  return User.findOne({
    $or: [{ identityNumber: number }, { accountNumber: number }],
  });
};

const storeDataUser = async (body) => {
  return User.create(body);
}

const updateDataUser = async (id, body) => {
  return User.findByIdAndUpdate(id, body);
}

const deleteDataUser = async (id) => {
  return User.findByIdAndDelete(id);
}

module.exports = {
  getAllUser,
  getUserByIdFromDB,
  getUserByIdentityOrAccountNumberFromDB,
  storeDataUser,
  updateDataUser,
  deleteDataUser
};