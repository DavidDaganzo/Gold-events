const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: String,
    profileImg: {
      type: String,
      default: 'https://cdn-icons-png.flaticon.com/512/892/892781.png'
    },
    role: {
      type: String,
      enum: ['USER', 'EDITOR', 'ADMIN'],
      default: 'USER'
    }
  },
  {
    timestamps: true
  }
);


module.exports = model('User', userSchema)

