const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeCont');

// Get all recipes
router.get('/', recipeController.getAllRecipes);

// Get a recipe by ID
router.get('/:id', recipeController.getRecipe);

// Get all recipes with ingredients
router.get('/ingredients', recipeController.getAllRecipesWithIngredients);

// Get recipes by category
router.get('/category/:category', recipeController.getRecipesByCategory);

// Create a new recipe
router.post('/', recipeController.createRecipeWithIngredients);

// Update a recipe by ID
router.put('/:id', recipeController.updateRecipe);

// Delete a recipe by ID
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;
