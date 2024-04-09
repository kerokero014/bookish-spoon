const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [200, 'Name cannot be more than 200 characters'] // Maximum 200 characters
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      maxlength: [2000, 'Name cannot be more than 200 characters'], // Maximum 2000 characters,
      minlength: [2, 'comment should be at least 2 characters'] // Minimum 2 characters
    },
    date: {
      type: Date,
      default: Date.now
    },
    recipeid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      required: [true, 'Recipe ID is required']
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model('Comment', CommentsSchema);
