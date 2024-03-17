const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentsSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model('Comment', CommentsSchema);
