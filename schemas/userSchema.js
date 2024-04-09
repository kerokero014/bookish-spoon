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
      default: ''
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
