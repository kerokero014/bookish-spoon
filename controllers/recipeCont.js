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
    const recipes = await Recipe.find().populate('ingredients');
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
      categories,
      image // Assuming the image is sent in the request body
    } = req.body;

    // Create ingredient documents
    const savedIngredients = await Ingredient.insertMany(ingredients);

    // Extract IDs of saved ingredients
    const ingredientIds = savedIngredients.map((ingredient) => ingredient._id);

    // Convert image to base64
    let imageBase64 = '';
    if (image) {
      imageBase64 = image.toString('base64');
    }

    // Create recipe document
    const recipe = new Recipe({
      name,
      description,
      cookTime,
      prepTime,
      servings,
      instructions,
      ingredients: ingredientIds,
      categories,
      image: imageBase64 // Store the image as base64 in the recipe document
    });

    // Save recipe
    const savedRecipe = await recipe.save();

    res.status(201).json(savedRecipe);
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.error('Validation Error:', error.message);
    } else {
      console.error('Error creating recipe with ingredients:', error);
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller for retrieving a recipe by ID
exports.getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('ingredients');
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
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      cookTime: req.body.cookTime,
      prepTime: req.body.prepTime,
      servings: req.body.servings,
      instructions: req.body.instructions,
      categories: req.body.categories
    };

    const recipe = await Recipe.findByIdAndUpdate(req.params.id, updateData, {
      new: true
    });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.error('Validation Error:', error.message);
    } else {
      console.error('Error creating recipe with ingredients:', error);
    }
    res.status(500).json({ message: 'Internal server error' });
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

//Controller for retrieving recipes by category

exports.getRecipesByCategory = async (req, res) => {
  try {
    const recipes = await Recipe.find({ categories: req.params.category });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
