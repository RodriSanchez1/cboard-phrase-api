const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const REPORT_SCHEMA_DEFINITION = {
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
  },
  type: {
    type: String,
  },
};

const REPORT_SCHEMA_OPTIONS = {
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

const reportSchema = new Schema(
  REPORT_SCHEMA_DEFINITION,
  REPORT_SCHEMA_OPTIONS
);

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
