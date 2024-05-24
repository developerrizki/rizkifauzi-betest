const express = require('express')
const router = express.Router()
const {
  getUsers,
  getUserByIdentityOrAccountNumber,
  storeUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const requireAuth = require('../middleware/auth');

router.get("/", requireAuth, getUsers);
router.get("/:number", requireAuth, getUserByIdentityOrAccountNumber);
router.post("/", requireAuth, storeUser);
router.put("/:id", requireAuth, updateUser);
router.delete("/:id", requireAuth, deleteUser);

module.exports = router