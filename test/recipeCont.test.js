const {
  getAllRecipes,
  createRecipeWithIngredients,
  getRecipe,
  updateRecipe,
  deleteRecipe
} = require('../controllers/recipeCont');

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
});
