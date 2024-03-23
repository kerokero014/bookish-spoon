const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IngredientSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true
    },
    notes: {
      type: String
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model('Ingredient', IngredientSchema);
