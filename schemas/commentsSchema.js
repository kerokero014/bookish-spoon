const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [200, 'Name cannot be more than 200 characters'] // Maximum 200 characters
    },
    comment: {
      type: String,
      required: true
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model('Comment', CommentsSchema);
