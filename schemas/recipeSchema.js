const mongoose = require('mongoose');
const ingredientSchema = require('../schemas/ingredientSchema');

const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [200, 'Name cannot be more than 200 characters'] // Maximum 200 characters
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [20, 'Description should be at least 20 characters'] // Minimum 20 characters
    },
    cookTime: {
      type: Number,
      required: [true, 'Cook time is required'],
      min: [1, 'Cook time should be at least 1 minute'] // Minimum 1 minute
    },
    prepTime: {
      type: Number,
      required: [true, 'Preparation time is required'],
      min: [1, 'Preparation time should be at least 1 minute'] // Minimum 1 minute
    },
    servings: {
      type: Number,
      required: [true, 'Number of servings is required'],
      min: [1, 'Number of servings should be at least 1'] // Minimum 1 serving
    },
    instructions: {
      type: [String],
      required: [true, 'Instructions are required']
    },
    ingredients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient', // Reference to the Ingredient model
        required: [true, 'Ingredients are required'] // At least one ingredient is required
      }
    ],
    categories: {
      type: [String],
      required: [true, 'Categories are required'] // At least one category is required
    },
    createdOn: {
      type: Date,
      default: Date.now,
      immutable: true // This field cannot be modified
    },
    recipeImage: {
      type: String
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model('recipe', recipeSchema);
