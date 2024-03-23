//developer: dayan frazao
const {
  getComments,
  getCommentById,
  createcomment,
  updateComment,
  deleteComment
} = require('../controllers/commentCont');

const Comment = require('../schemas/commentsSchema');

// Mocking dependencies
jest.mock('../schemas/commentsSchema', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  save: jest.fn(),
  deleteOne: jest.fn()
}));

//jest.mock('../schemas/commentsSchema', () => ({
//  save: jest.fn()
//}));

describe('Comments Controller', () => {
  describe('getComments', () => {
    it('should return all comments', async () => {
      const mockComments = [
        {
          name: 'Chocolate Chip Cookies',
          comment: 'A classic and delicious treat - chewy and soft chocolate chip cookies'
        }
      ];
      //const Comment = require('../schemas/commentsSchema');
      Comment.find.mockResolvedValue(mockComments);
      const req = {};

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await getComments(req, res);

      expect(res.json).toHaveBeenCalledWith(mockComments);
    });
    it('should handle errors', async () => {
      const errorMessage = 'Internal server error';
      //const Comment = require('../schemas/commentsSchema');
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
  describe('getCommentById', () => {
    it('should return comment by id', async () => {
      const mockRecipe = {
        _id: 'commentId',
        name: 'Test Recipe',
        comment: 'Test Description'
      };
      Comment.findById.mockResolvedValue(mockRecipe);
      const req = { params: { id: 'commentId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await getCommentById(req, res);

      expect(Comment.findById).toHaveBeenCalledWith('commentId');
      expect(res.json).toHaveBeenCalledWith(mockRecipe);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Internal server error';
      Comment.findById.mockRejectedValue(new Error(errorMessage));
      const req = { params: { id: 'commentId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await getCommentById(req, res);

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
          comment: 'Test Description'
        }
      };
      const mockUpdatedComment = {
        _id: 'commentId',
        ...req.body
      };
      Comment.findById.mockResolvedValue(mockUpdatedComment);
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await updateComment(req, res);

      expect(Comment.findById).toHaveBeenCalledWith('commentId');
      expect(res.json).toHaveBeenCalledWith(mockUpdatedComment);
    });
<<<<<<< HEAD
  
    // updateCommentbyid
    describe('updateComment', () => {
      it('should update comment by id', async () => {
        const req = {
          params: { id: 'commentId' },
          body: {
            name: 'Test Comment',
            comment: 'Test Description',
          }
        };
        const mockUpdatedComment = {
          _id: 'commentId',
          name: req.body.name,
          comment: req.body.comment,
        };
        Comment.findByIdAndUpdate.mockResolvedValue(mockUpdatedComment);
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
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
  
        expect(Comment.findByIdAndUpdate).toHaveBeenCalledWith('commentId', req.body, {
          new: true
        });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
=======

    it('should handle errors', async () => {
      const errorMessage = 'Internal server error';
      Comment.findById.mockRejectedValue(new Error(errorMessage));
      const req = {
        params: { id: 'commentId' },
        body: {
          // Request body with missing or invalid data
        }
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await updateComment(req, res);

      expect(Comment.findById).toHaveBeenCalledWith('commentId', req.body, {
        new: true
>>>>>>> 4c4fd2a98f4df0490ab78c8e52e854e3cd4ac310
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

      Comment.findById.mockResolvedValue(true);

      await deleteComment(mockReq, mockRes);

      expect(Comment.findById).toHaveBeenCalledWith('commentId');
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Comment deleted successfully' });
    });
  });
});
