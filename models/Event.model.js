const { Schema, model } = require('mongoose')

const eventSchema = new Schema(
  {
    eventName: {
      type: String,
      required: true
    },

    category: {
      type: String,
      enum: ['Hip-Hop/Rap', 'Rock', 'Dance/Electronic', 'Pop', 'Other'],
      required: true
    },

    eventImg: {
      type: String
    },

    eventUrl: {
      type: String,
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    price: {
      type: String,
      required: true
    },

    // createdBy: {
    //   type: mongoose.Types.ObjectId,
    //   ref: 'User',
    // },

    city: {
      type: String,
      required: true
    },

    description: {
      type: String,
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Event', eventSchema)