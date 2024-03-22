//Developer: Jean Yves K

const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postCont');

const Post = require('../schemas/postSchema');
//   const Ingredient = require('../schemas/ingredientSchema');

// Mocking dependencies
jest.mock('../schemas/postSchema', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  save: jest.fn()
}));

//   jest.mock('../schemas/ingredientSchema', () => ({
//     save: jest.fn()
//   }));

describe('Post Controller', () => {
  describe('getPosts', () => {
    it('should return all posts', async () => {
      const mockPosts = [
        {
          title: 'My Awesome Blog Post',
          content:
            'This is the main content of my blog post. It can include text and even some <b>formatting</b>!',
          authorid: '65e693c61a1fa8a178153753',
          authorName: 'kevin Mendoza',
          date: '2024-03-08T15:21:00Z',
          recipeid: '65e66d465af2d1169ad696a0',
          recipeName: 'Chocolate Chip cookies'
        }
      ];
      const Post = require('../schemas/postSchema');
      Post.find.mockResolvedValue(mockPosts);
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await getPosts(req, res);

      expect(res.json).toHaveBeenCalledWith(mockPosts);
    });
    it('should handle errors', async () => {
      const errorMessage = 'Internal server error';
      const Post = require('../schemas/postSchema');
      Post.find.mockRejectedValue(new Error(errorMessage));
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await getPosts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error getting posts',
        error: errorMessage
      });
    });
  });

  // createPost
  // describe('createPost', () => {
  //     it('should return post by id', async () => {

  //     })
  // })

  // getPostbyid
  describe('getPostById', () => {
    it('should return post by id', async () => {
      const mockPost = {
        // { title, content, authorid, authorName, date, recipeid, recipeName }
        _id: 'postId',
        title: 'Test Post',
        content:
          'This is the main content of my blog post. It can include text and even some <b>formatting</b>!',
        authorid: '65e693c61a1fa8a178153753',
        authorName: 'kevin Mendoza',
        date: '2024-03-08T15:21:00Z',
        recipeid: '65e66d465af2d1169ad696a0',
        recipeName: 'Chocolate Chip cookies'
      };
      Post.findById.mockResolvedValue(mockPost);
      const req = { params: { id: 'postId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await getPostById(req, res);

      expect(Post.findById).toHaveBeenCalledWith('postId');
      expect(res.json).toHaveBeenCalledWith(mockPost);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Internal server error';
      Post.findById.mockRejectedValue(new Error(errorMessage));
      const req = { params: { id: 'postId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await getPostById(req, res);

      expect(Post.findById).toHaveBeenCalledWith('postId');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error getting post', error: errorMessage });
    });
  });

  // updatePostbyid
  describe('updatePost', () => {
    it('should update post by id', async () => {
      const req = {
        params: { id: 'postId' },
        body: {
          title: 'Test Post',
          content:
            'This is the main content of my blog post. It can include text and even some <b>formatting</b>!',
          authorid: '65e693c61a1fa8a178153753',
          authorName: 'kevin Mendoza',
          date: '2024-03-08T15:21:00Z',
          recipeid: '65e66d465af2d1169ad696a0',
          recipeName: 'Chocolate Chip cookies'
        }
      };
      const mockUpdatedPost = {
        _id: 'postId',
        ...req.body
      };
      Post.findByIdAndUpdate.mockResolvedValue(mockUpdatedPost);
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await updatePost(req, res);

      expect(Post.findByIdAndUpdate).toHaveBeenCalledWith('postId', req.body, {
        new: true,
        runValidators: true
      });
      expect(res.json).toHaveBeenCalledWith(mockUpdatedPost);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Internal server error';
      Post.findByIdAndUpdate.mockRejectedValue(new Error(errorMessage));
      const req = {
        params: { id: 'postId' },
        body: {
          // Request body with missing or invalid data
        }
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await updatePost(req, res);

      expect(Post.findByIdAndUpdate).toHaveBeenCalledWith('postId', req.body, {
        new: true,
        runValidators: true
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error updating post',
        error: errorMessage
      });
    });
  });

  //deletePost
  describe('deletePost', () => {
    it('should delete post by id', async () => {
      const mockReq = {
        params: {
          id: 'postId'
        }
      };
      const mockRes = {
        json: jest.fn(),
        status: jest.fn(() => mockRes) // to allow chaining .status().json()
      };

      Post.findByIdAndDelete.mockResolvedValue(true);

      await deletePost(mockReq, mockRes);

      expect(Post.findByIdAndDelete).toHaveBeenCalledWith('postId');
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Post deleted' });
    });
  });
});
