const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      minlength: 3
    },
    content: {
      type: String,
      required: true,
      unique: true,
      minlength: 3
    },
    authorid: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    authorName: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now,
      immutable: true
    },
    recipeid: {
      type: Schema.Types.ObjectId,
      ref: 'Recipe'
    },
    recipeName: {
      type: String
    }
    //recipeImage: {   //Image will be implemented it once we figure out where to get the images whether url or byteimg
    //    type: String,
    //},
  },
  { versionKey: false }
);

module.exports = mongoose.model('Post', postSchema);
