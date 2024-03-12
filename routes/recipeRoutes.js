const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeCont');

// Get all recipes
router.get('/', recipeController.getAllRecipes);

// Create a new recipe
router.post('/', recipeController.createRecipeWithIngredients);

// Get a recipe by ID
router.get('/:id', recipeController.getRecipe);

// Update a recipe by ID
router.put('/:id', recipeController.updateRecipe);

// Delete a recipe by ID
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;
