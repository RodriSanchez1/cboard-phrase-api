const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EVENT_SCHEMA_DEFINITION = {
  userId: {
    type: String,
  },
  time: {
    type: Date,
  },
  action: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  label: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
  },
};

const EVENT_SCHEMA_OPTIONS = {
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
};

const eventSchema = new Schema(EVENT_SCHEMA_DEFINITION, EVENT_SCHEMA_OPTIONS);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
