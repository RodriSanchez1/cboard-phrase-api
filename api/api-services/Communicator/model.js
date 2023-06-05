const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const COMMUNICATOR_SCHEMA_DEFINITION = {
  name: {
    type: String,
    unique: false,
    required: true,
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
  description: {
    type: String,
    unique: false,
    required: false,
    trim: true,
  },
  rootCategory: {
    type: String,
    unique: false,
    required: true,
    trim: true,
  },
  categories: [{ type: String }],
};

const COMMUNICATOR_SCHEMA_OPTIONS = {
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

const communicatorSchema = new Schema(
  COMMUNICATOR_SCHEMA_DEFINITION,
  COMMUNICATOR_SCHEMA_OPTIONS
);

/**
 * Validations
 */

// the below validations only apply if you are signing up traditionally

communicatorSchema.path('name').validate(function (name) {
  if (this.skipValidation()) return true;
  return name.length;
}, 'Name cannot be blank');

communicatorSchema.path('author').validate(function (author) {
  if (this.skipValidation()) return true;
  return author.length;
}, 'Author cannot be blank');

communicatorSchema.path('email').validate(function (email) {
  if (this.skipValidation()) return true;
  return email.length;
}, "Author's email cannot be blank");

communicatorSchema.path('categories').validate(function (categories) {
  if (this.skipValidation()) return true;
  return categories.length;
}, 'Categories length should be greater than 0');

communicatorSchema.path('rootCategory').validate(function (rootCategory) {
  if (this.skipValidation()) return true;
  return rootCategory.length;
}, 'RootCategory cannot be blank');

communicatorSchema.path('rootCategory').validate(function (rootCategory) {
  if (this.skipValidation()) {
    return true;
  }

  return this.categories.indexOf(rootCategory) >= 0;
}, 'Communicator rootCategory should be exists in categories field');

communicatorSchema.path('email').validate(async function (email) {
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

communicatorSchema.pre('save', function (next) {
  if (!this.isNew) return next();
  next();
});

/**
 * Methods
 */

communicatorSchema.methods = {
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
communicatorSchema.statics = {};

const Communicator = mongoose.model('Communicator', communicatorSchema);

module.exports = Communicator;
