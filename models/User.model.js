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

    password: {
      type: String,
      required: true
    },

    profileImg: {
      type: String,
      default: 'https://www.jesusmaestro.escuelateresiana.com/wp-content/uploads/2015/03/user-default.png'
    },

    role: {
      type: String,
      enum: ['USER', 'EDITOR', 'ADMIN'],
      default: 'USER'
    },

    favourites: [{
      type: Schema.Types.ObjectId,
      ref: 'Event',
    }],
  },

  {
    timestamps: true
  }
);

module.exports = model('User', userSchema)

