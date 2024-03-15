const express = require('express');
const router = express.Router();
const ingCont = require('../controllers/ingredCont');

// Get all recipes
router.get('/', ingCont.getIngredients);

// Create a new recipe
router.post('/', ingCont.createIngredient);

// Get a recipe by ID
router.get('/:id', ingCont.getIngredientById);

// Update a recipe by ID
router.put('/:id', ingCont.updateIngredient);

// Delete a recipe by ID
router.delete('/:id', ingCont.deleteIngredient);

module.exports = router;
