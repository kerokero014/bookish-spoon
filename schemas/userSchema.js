const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userFirstName: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      trim: true,
      validate: {
        validate: {
          validator: async function (value) {
            const user = await User.findOne({ username: value });
            return !user;
          },
          message: 'Username already exists'
        }
      }
    },
    userLastName: {
      type: String,
      required: true,
      unique: true,
      minlength: 3
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100, // New validation: maximum length
      validate: {
        validator: function (v) {
          // New validation: password must contain at least one number and one special character
          return /(?=.*[0-9])(?=.*[!@#$%^&*])/.test(v);
        },
        message: 'Password must contain at least one number and one special character'
      }
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
      lowercase: true, // New validation: convert email to lowercase
      trim: true // New validation: remove leading and trailing spaces
    },
    recipes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
      }
    ],
    profileCreated: {
      type: Date,
      default: Date.now,
      immutable: true
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model('User', userSchema);
