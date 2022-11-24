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
      type: String,
      default: 'https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg'
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

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

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