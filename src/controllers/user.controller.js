const redis = require('redis');
const {
  getAllUser,
  getUserByIdFromDB,
  getUserByIdentityOrAccountNumberFromDB,
  storeDataUser,
  updateDataUser,
  deleteDataUser
} = require("../services/user.service");

let redisClient;

(async () => {
  redisClient = redis.createClient({
    url: "rediss://:p2ff8e9baea1d6a448cef9b4208be1ca5a02d5d093d3c7732acc4e07512d2c1ed@ec2-3-211-177-74.compute-1.amazonaws.com:19670",
    socket: {
      tls: true,
      rejectUnauthorized: false,
    },
  });
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
      users = await getAllUser();
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
    const user = await getUserByIdFromDB(id)
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
    const user = await getUserByIdentityOrAccountNumberFromDB(number);
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
    const user = await storeDataUser(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await updateDataUser(id, req.body)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    const updateUser = await getUserByIdFromDB(id)
    res.status(201).json(updateUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await deleteDataUser(id);
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