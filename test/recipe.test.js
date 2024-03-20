const {
  getAllRecipes,
  createRecipeWithIngredients,
  getRecipe,
  updateRecipe,
  deleteRecipe
} = require('../controllers/recipeCont');

const Recipe = require('../schemas/recipeSchema');
const Ingredient = require('../schemas/ingredientSchema');

// Mocking dependencies
jest.mock('../schemas/recipeSchema', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  save: jest.fn()
}));

jest.mock('../schemas/ingredientSchema', () => ({
  save: jest.fn()
}));

describe('Recipe Controller', () => {
  describe('getAllRecipes', () => {
    it('should return all recipes', async () => {
      const mockRecipes = [
        {
          name: 'Chocolate Chip Cookies',
          description: 'A classic and delicious treat - chewy and soft chocolate chip cookies',
          cookTime: 15,
          prepTime: 10,
          servings: 24,
          instructions: [
            'Preheat oven to 375°F (190°C).',
            'Cream together butter and sugars in a large bowl until light and fluffy.',
            'Beat in eggs one at a time, then stir in vanilla extract.',
            'In a separate bowl, whisk together flour, baking soda, and salt.',
            'Gradually add dry ingredients to wet ingredients, mixing until just combined.',
            'Stir in chocolate chips.',
            'Drop by rounded tablespoons onto baking sheets lined with parchment paper.',
            'Bake for 10-12 minutes, or until edges are golden brown.',
            'Let cool on baking sheet for a few minutes before transferring to a wire rack to cool completely.'
          ],
          categories: ['Dessert', 'Baking', 'Kid-Friendly']
        }
      ];
      const Recipe = require('../schemas/recipeSchema');
      Recipe.find.mockResolvedValue(mockRecipes);
      const req = {};
      const res = { json: jest.fn() };

      await getAllRecipes(req, res);

      expect(res.json).toHaveBeenCalledWith(mockRecipes);
    });
    it('should handle errors', async () => {
      const errorMessage = 'Internal server error';
      const Recipe = require('../schemas/recipeSchema');
      Recipe.find.mockRejectedValue(new Error(errorMessage));
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await getAllRecipes(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  // createRecipeWithIngredients

  // getRecipebyid
  describe('getRecipe', () => {
    it('should return recipe by id', async () => {
      const mockRecipe = {
        _id: 'recipeId',
        name: 'Test Recipe',
        description: 'Test Description',
        cookTime: 30,
        prepTime: 15,
        servings: 4,
        instructions: 'Test Instructions',
        ingredients: ['ingredientId1', 'ingredientId2'],
        categories: ['Category 1', 'Category 2']
      };
      Recipe.findById.mockResolvedValue(mockRecipe);
      const req = { params: { id: 'recipeId' } };
      const res = { json: jest.fn() };

      await getRecipe(req, res);

      expect(Recipe.findById).toHaveBeenCalledWith('recipeId');
      expect(res.json).toHaveBeenCalledWith(mockRecipe);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Internal server error';
      Recipe.findById.mockRejectedValue(new Error(errorMessage));
      const req = { params: { id: 'recipeId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await getRecipe(req, res);

      expect(Recipe.findById).toHaveBeenCalledWith('recipeId');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  // updateRecipebyid
  describe('updateRecipe', () => {
    it('should update recipe by id', async () => {
      const req = {
        params: { id: 'recipeId' },
        body: {
          name: 'Test Recipe',
          description: 'Test Description',
          cookTime: 30,
          prepTime: 15,
          servings: 4,
          instructions: 'Test Instructions',
          ingredients: ['ingredientId1', 'ingredientId2'],
          categories: ['Category 1', 'Category 2']
        }
      };
      const mockUpdatedRecipe = {
        _id: 'recipeId',
        ...req.body
      };
      Recipe.findByIdAndUpdate.mockResolvedValue(mockUpdatedRecipe);
      const res = { json: jest.fn() };

      await updateRecipe(req, res);

      expect(Recipe.findByIdAndUpdate).toHaveBeenCalledWith('recipeId', req.body, {
        new: true
      });
      expect(res.json).toHaveBeenCalledWith(mockUpdatedRecipe);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Internal server error';
      Recipe.findByIdAndUpdate.mockRejectedValue(new Error(errorMessage));
      const req = {
        params: { id: 'recipeId' },
        body: {
          // Request body with missing or invalid data
        }
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await updateRecipe(req, res);

      expect(Recipe.findByIdAndUpdate).toHaveBeenCalledWith('recipeId', req.body, {
        new: true
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  //deleteRecipebyid
  describe('deleteRecipe', () => {
    it('should delete recipe by id', async () => {
      const mockReq = {
        params: {
          id: 'recipeId'
        }
      };
      const mockRes = {
        json: jest.fn(),
        status: jest.fn(() => mockRes) // to allow chaining .status().json()
      };

      Recipe.findByIdAndDelete.mockResolvedValue(true);

      await deleteRecipe(mockReq, mockRes);

      expect(Recipe.findByIdAndDelete).toHaveBeenCalledWith('recipeId');
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Recipe deleted successfully' });
    });
  });
});
