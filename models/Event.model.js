const { Schema, model } = require('mongoose')

const eventSchema = new Schema(
  {
    eventName: {
      type: String,
      required: true
    },
    genre: {
      type: String,
      enum: ['Music', 'Sports', 'Arts & Theatre'],
      required: true
    },
    eventImg: {
      type: String,
      default: 'https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg'

    },
    eventUrl: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);


module.exports = model('Event', eventSchema)