const mongoose = require('mongoose');
const constants = require('../../constants');
const Schema = mongoose.Schema;

const CATEGORY_SCHEMA_DEFINITION = {
  name: {
    type: String,
    unique: false,
    required: true,
    trim: true,
  },
  namekey: {
    type: String,
    unique: false,
    required: false,
    trim: true,
  },
  author: {
    type: String,
    unique: false,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: false,
    required: true,
    trim: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  phrases: {
    type: Array,
    unique: false,
  },
  locale: {
    type: String,
    default: constants.DEFAULT_LANG,
  },
  lastEdited: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    unique: false,
    default: '',
  },
};

const CATEGORY_SCHEMA_OPTIONS = {
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

const categorySchema = new Schema(
  CATEGORY_SCHEMA_DEFINITION,
  CATEGORY_SCHEMA_OPTIONS
);

/**
 * Validations
 */

// the below validations only apply if you are signing up traditionally

categorySchema.path('name').validate(function (name) {
  if (this.skipValidation()) return true;
  return name.length;
}, 'Name cannot be blank');

categorySchema.path('email').validate(function (email) {
  if (this.skipValidation()) return true;
  return email.length;
}, 'User email cannot be blank');

categorySchema.path('email').validate(async function (email) {
  const User = mongoose.model('User');
  if (this.skipValidation()) {
    return true;
  }

  // Check only when it is a new user or when email field is modified
  if (this.isNew || this.isModified('email')) {
    const users = await User.find({ email }).exec();
    if (users.length < 1) {
      return false;
    }
  }

  return true;
}, 'User Email does not exist in database');

/**
 * Pre-save hook
 */

categorySchema.pre('save', function (next) {
  if (!this.isNew) return next();
  next();
});

/**
 * Methods
 */

categorySchema.methods = {
  /**
   * Validation is not required if using OAuth
   */

  skipValidation: function () {
    return null;
  },
};

/**
 * Statics
 */

categorySchema.statics = {
  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function (options, cb) {
    options.select = options.select || 'name email';
    return this.findOne(options.criteria).select(options.select).exec(cb);
  },
};

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
