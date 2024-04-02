const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IngredientSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      maxlength: [200, 'Name cannot be more than 200 characters'] // Maximum 200 characters
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required']
    },
    unit: {
      type: String,
      required: [true, 'Unit is required'],
      maxlength: [200, 'Unit cannot be more than 200 characters'], // Maximum 200 characters
      minlength: [2, 'Unit should be at least 2 characters'] // Minimum 2 characters
    },
    notes: {
      type: String,
      maxlength: [2000, 'Notes cannot be more than 200 characters'], // Maximum 200 characters
      minlength: [2, 'Notes should be at least 2 characters'] // Minimum 2 characters
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model('Ingredient', IngredientSchema);
