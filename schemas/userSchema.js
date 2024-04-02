const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userFirstName: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      trim: true
    },
    userLastName: {
      type: String,
      required: true,
      minlength: 3,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 72, // Adjusted maximum length
      validate: {
        validator: function (v) {
          // New validation: password must contain at least one number, one uppercase letter, one lowercase letter, and one special character
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(v);
        },
        message:
          'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character'
      }
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
      lowercase: true,
      trim: true
    },
    Auth0Id: {
      type: String,
      default: '',
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
    },
    UserImage: {
      type: String,
      default: 'https://via.placeholder.com/150'
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model('User', userSchema);
