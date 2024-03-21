//developer: dayan frazao 
const {
    getComments,
    GetcommentById,
    createcomment,
    updateComment,
    deleteComment
  } = require('../controllers/commentCont');
  
  const comment = require('../schemas/commentsSchema');
  
  // Mocking dependencies
  jest.mock('../schemas/commentsSchema', () => ({
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    save: jest.fn()
  }));
  
  jest.mock('../schemas/commentsSchema', () => ({
    save: jest.fn()
  }));
  
  describe('Comments Controller', () => {
    describe('getComments', () => {
      it('should return all comments', async () => {
        const mockComments = [
          {
            name: 'Chocolate Chip Cookies',
            description: 'A classic and delicious treat - chewy and soft chocolate chip cookies',
            cookTime: 15
          }
        ];
        const Comment = require('../schemas/commentsSchema');
        Comment.find.mockResolvedValue(mockComments);
        const req = {};
        const res = { json: jest.fn() };
  
        await getComments(req, res);
  
        expect(res.json).toHaveBeenCalledWith(mockComments);
      });
      it('should handle errors', async () => {
        const errorMessage = 'Internal server error';
        const Comment = require('../schemas/commentsSchema');
        Comment.find.mockRejectedValue(new Error(errorMessage));
        const req = {};
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
        await getComments(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
      });
    });
  
    // createRecipeWithIngredients
  
    // getRecipebyid
    describe('getComment', () => {
      it('should return comment by id', async () => {
        const mockRecipe = {
          _id: 'commentId',
          name: 'Test Recipe',
          description: 'Test Description'
        };
        Comment.findById.mockResolvedValue(mockRecipe);
        const req = { params: { id: 'commentId' } };
        const res = { json: jest.fn() };
  
        await getComment(req, res);
  
        expect(Comment.findById).toHaveBeenCalledWith('commentId');
        expect(res.json).toHaveBeenCalledWith(mockRecipe);
      });
  
      it('should handle errors', async () => {
        const errorMessage = 'Internal server error';
        Comment.findById.mockRejectedValue(new Error(errorMessage));
        const req = { params: { id: 'commentId' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
        await getComment(req, res);
  
        expect(Comment.findById).toHaveBeenCalledWith('commentId');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
      });
    });
  
    // updateRecipebyid
    describe('updateComment', () => {
      it('should update comment by id', async () => {
        const req = {
          params: { id: 'commentId' },
          body: {
            name: 'Test Comment',
            description: 'Test Description',
            cookTime: 30
          }
        };
        const mockUpdatedComment = {
          _id: 'commentId',
          ...req.body
        };
        Comment.findByIdAndUpdate.mockResolvedValue(mockUpdatedComment);
        const res = { json: jest.fn() };
  
        await updateComment(req, res);
  
        expect(Comment.findByIdAndUpdate).toHaveBeenCalledWith('commentId', req.body, {
          new: true
        });
        expect(res.json).toHaveBeenCalledWith(mockUpdatedComment);
      });
  
      it('should handle errors', async () => {
        const errorMessage = 'Internal server error';
        Comment.findByIdAndUpdate.mockRejectedValue(new Error(errorMessage));
        const req = {
          params: { id: 'commentId' },
          body: {
            // Request body with missing or invalid data
          }
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
        await updateComment(req, res);
  
        expect(Comment.findByIdAndUpdate).toHaveBeenCalledWith('recipeId', req.body, {
          new: true
        });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
      });
    });
  
    //deleteRecipebyid
    describe('deleteComment', () => {
      it('should delete comment by id', async () => {
        const mockReq = {
          params: {
            id: 'commentId'
          }
        };
        const mockRes = {
          json: jest.fn(),
          status: jest.fn(() => mockRes) // to allow chaining .status().json()
        };
  
        Comment.findByIdAndDelete.mockResolvedValue(true);
  
        await deleteComment(mockReq, mockRes);
  
        expect(Comment.findByIdAndDelete).toHaveBeenCalledWith('commentId');
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Comment deleted successfully' });
      });
    });
  });