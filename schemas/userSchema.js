const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userFirstName: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },

  userLastName: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  password: {
    //easy password for now once OAuth us implemented  we will require a more secure password
    type: String,
    required: true,
    minlength: 5
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
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
});

module.exports = mongoose.model('User', userSchema);
