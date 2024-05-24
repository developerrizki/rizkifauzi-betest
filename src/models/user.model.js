const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please enter your username"]
    },
    accountNumber: {
      type: String,
      required: false,
    },
    emailAddress: {
      type: String,
      required: [true, "Please enter your email"]
    },
    identityNumber: {
      type: String,
      required: [true, "Please enter your identity number"]
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', UserSchema)

module.exports = User
