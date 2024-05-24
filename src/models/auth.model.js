const mongoose = require('mongoose')

const authSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
)

const Auth = mongoose.model('auth', authSchema)

module.exports = Auth