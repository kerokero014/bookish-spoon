const mongoose = require('mongoose');
const ingredientSchema = require('../schemas/ingredientSchema');

const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    description: {
      type: String,
      required: true
    },
    cookTime: {
      type: Number
    },
    prepTime: {
      type: Number
    },
    servings: {
      type: Number,
      required: true
    },
    instructions: {
      type: [String],
      required: true
    },
    ingredients: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Ingredient', // Reference to the Ingredient model
        required: true
      }
    ],
    categories: {
      type: [String],
      required: true
    },
    //createdBy: {
    //  type: Schema.Types.ObjectId, //refer to the user schema
    //  ref: 'User',
    //  required: true
    //},
    createdOn: {
      type: Date,
      default: Date.now,
      immutable: true
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model('recipe', recipeSchema);
