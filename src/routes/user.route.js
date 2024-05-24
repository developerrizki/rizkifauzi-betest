const express = require('express')
const router = express.Router()
const {
  getUsers,
  getUserByIdentityOrAccountNumber,
  storeUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

router.get('/', getUsers)
router.get('/:number', getUserByIdentityOrAccountNumber);
router.post('/', storeUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router