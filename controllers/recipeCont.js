//Controller incharge or adding and removing recipes from the database
// Dev: Kevin Mendoza

//TODO: GetAll recipes function (GET)
//TODO: Add recipes function (POST)
//TODO: Remove recipes function (DELETE)
//TODO: Update recipes function (PUT)
//TODO: Get recipes by ID function or by name (GET)

const Recipe = require('../schemas/recipeSchema');
const Ingredient = require('../schemas/ingredientSchema');

// Controller for retrieving all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createRecipeWithIngredients = async (req, res) => {
  try {
    const {
      name,
      description,
      cookTime,
      prepTime,
      servings,
      instructions,
      ingredients,
      categories
    } = req.body;

    // Create recipe document
    const recipe = new Recipe({
      name,
      description,
      cookTime,
      prepTime,
      servings,
      instructions,
      categories,
      createdBy: req.user._id // Assuming you have user information stored in req.user
    });
    const savedRecipe = await recipe.save();

    // Create and store ingredient documents
    const savedIngredients = await Promise.all(
      ingredients.map(async (ingredientData) => {
        const ingredient = new Ingredient({
          ...ingredientData,
          recipeId: savedRecipe._id
        });
        return await ingredient.save();
      })
    );
    // Update recipe with ingredient IDs
    savedRecipe.ingredients = savedIngredients.map((ingredient) => ingredient._id);
    await savedRecipe.save();

    // Populate ingredients field before sending the response
    const populatedRecipe = await savedRecipe.populate('ingredients').execPopulate();

    res.status(201).json(populatedRecipe);
  } catch (error) {
    console.error('Error creating recipe with ingredients:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller for retrieving a recipe by ID
exports.getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for updating a recipe by ID
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for deleting a recipe by ID
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
