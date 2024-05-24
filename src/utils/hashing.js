const bcrypt = require('bcrypt')

const hashSyncPassword = (password) => {
  return bcrypt.hashSync(password, 10)
}

const checkPassword = (password, userPassword) => {
  return bcrypt.compareSync(password, userPassword)
}

module.exports = {
  hashSyncPassword, checkPassword
}