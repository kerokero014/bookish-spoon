const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeCont');

// Get all recipes
router.get('/', recipeController.getAllRecipes);

// Get recipes by name
router.get('/name/:name', recipeController.getRecipesByName);

// Get a recipe by ID
router.get('recipe/:id', recipeController.getRecipe);

// Get recipes by category
router.get('/category/:category', recipeController.getRecipesByCategory);

// Create a new recipe
router.post('/', recipeController.createRecipeWithIngredients);

// Update a recipe by ID
router.put('/:id', recipeController.updateRecipe);

// Delete a recipe by ID
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;
