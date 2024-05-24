const User = require("../models/user.model")
const redis = require('redis')

let redisClient;

(async () => {
  redisClient = redis.createClient();
  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  await redisClient.connect();
})();

const getUsers = async (req, res) => {
  const redisUsers = "redis_rizkifauzi_betest";
  let users;
  try {
    const cacheUsers = await redisClient.get(redisUsers);
    if (cacheUsers) {
      users = JSON.parse(cacheUsers);
    } else {
      users = await User.find({});
      if (users.length === 0) {
        throw "API returned an empty array";
      }
      await redisClient.set(redisUsers, JSON.stringify(users));
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getUserByIdentityOrAccountNumber = async (req, res) => {
  try {
    const { number } = req.params;
    const user = await User.findOne({
      $or: [{ identityNumber: number }, { accountNumber: number }],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const storeUser = async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findByIdAndUpdate(id, req.body)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    const updateUser = await User.findById(id)
    res.status(201).json(updateUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  getUserByIdentityOrAccountNumber,
  storeUser,
  updateUser,
  deleteUser,
};