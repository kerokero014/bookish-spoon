const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, 'Title should be at least 3 characters'],
      maxlength: [100, 'Title cannot be more than 100 characters'], // New validation: maximum length
      trim: true // New validation: remove leading and trailing spaces
    },
    content: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, 'The content should be at least 3 characters'],
      maxlength: [5000, 'The content cannot be more than 5000 characters'],
      trim: true // New validation: remove leading and trailing spaces
    },
    authorid: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true // New validation: authorid is required
    },
    authorName: {
      type: String,
      required: true, // New validation: authorName is required
      trim: true // New validation: remove leading and trailing spaces
    },
    date: {
      type: Date,
      default: Date.now,
      immutable: true
    },
    recipeid: {
      type: Schema.Types.ObjectId,
      ref: 'Recipe',
      required: true // New validation: recipeid is required
    },
    recipeName: {
      type: String,
      required: true, // New validation: recipeName is required
      trim: true // New validation: remove leading and trailing spaces
    }
    //recipeImage: {   //Image will be implemented it once we figure out where to get the images whether url or byteimg
    //    type: String,
    //},
  },
  { versionKey: false }
);

module.exports = mongoose.model('Post', postSchema);
