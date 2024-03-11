const mongoose = require("mongoose");
const ingredientSchema = require("../schemas/ingredientSchema");

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cookTime: {
    type: Number,
  },
  prepTime: {
    type: Number,
  },
  servings: {
    type: Number,
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
  ingredients: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ingredient", // Reference to the Ingredient model
      required: true,
    },
  ],
  categories: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("recipe", recipeSchema);
