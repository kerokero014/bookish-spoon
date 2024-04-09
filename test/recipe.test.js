const {
  getAllRecipes,
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
  save: jest.fn(),
  find: jest.fn(() => ({
    populate: jest.fn().mockResolvedValue([
      {
        description: 'A classic and delicious treat - chewy and soft chocolate chip cookies',
        name: 'Chocolate Chip Cookies'
      }
    ])
  }))
}));

jest.mock('../schemas/ingredientSchema', () => ({
  save: jest.fn(),
  findById: jest.fn(),
  findByName: jest.fn()
}));

describe('Recipe Controller', () => {
  describe('getAllRecipes', () => {
    let req, res;

    beforeEach(() => {
      req = {};
      res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return all recipes', async () => {
      const mockRecipes = [
        { _id: 'recipe1', title: 'Recipe 1', ingredients: ['ingredient1', 'ingredient2'] },
        { _id: 'recipe2', title: 'Recipe 2', ingredients: ['ingredient3', 'ingredient4'] }
      ];

      // Mocking populate method
      const mockPopulate = jest.fn().mockResolvedValue(mockRecipes);
      Recipe.find.mockReturnValueOnce({ populate: mockPopulate });

      await getAllRecipes(req, res);

      expect(Recipe.find).toHaveBeenCalled();
      expect(mockPopulate).toHaveBeenCalledWith('ingredients');
      expect(res.json).toHaveBeenCalledWith(mockRecipes);
    });
  });

  // getRecipebyid
  describe('getRecipe', () => {
    let req, res;

    beforeEach(() => {
      req = { params: { id: 'someRecipeId' } };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return recipe if found', async () => {
      const mockRecipe = {
        _id: 'someRecipeId',
        title: 'Test Recipe',
        ingredients: ['ingredient1', 'ingredient2']
      };
      const mockPopulate = jest.fn().mockResolvedValueOnce(mockRecipe);
      Recipe.findById.mockReturnValueOnce({ populate: mockPopulate });

      await getRecipe(req, res);

      expect(Recipe.findById).toHaveBeenCalledWith('someRecipeId');
      expect(mockPopulate).toHaveBeenCalledWith('ingredients');
      expect(res.json).toHaveBeenCalledWith(mockRecipe);
    });
  });

  // updateRecipebyid
  describe('updateRecipe', () => {
    it('should update recipe by id', async () => {
      const mockReq = {
        params: {
          id: 'recipeId'
        },
        body: {
          name: 'Chocolate Chip Cookies',
          description: 'A classic and delicious treat - chewy and soft chocolate chip cookies'
        }
      };
      const mockRes = {
        json: jest.fn(),
        status: jest.fn(() => mockRes) // to allow chaining .status().json()
      };

      Recipe.findByIdAndUpdate.mockResolvedValue({
        name: 'Chocolate Chip Cookies',
        description: 'A classic and delicious treat - chewy and soft chocolate chip cookies'
      });

      await updateRecipe(mockReq, mockRes);

      expect(Recipe.findByIdAndUpdate).toHaveBeenCalledWith('recipeId', mockReq.body, {
        new: true
      });
      expect(mockRes.json).toHaveBeenCalledWith({
        name: 'Chocolate Chip Cookies',
        description: 'A classic and delicious treat - chewy and soft chocolate chip cookies'
      });
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
