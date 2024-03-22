//Developer: Vishal Vaid

const { getAllUsers } = require('../controllers/userCont');

const User = require('../schemas/userSchema');

jest.mock('../schemas/userSchema', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  findOneAndDelete: jest.fn(),
  findOneAndUpdate: jest.fn(),
  save: jest.fn()
}));

describe('User Controller Tests', () => {
  // createUser
  describe('Get all users', () => {
    it('should return all users', async () => {
      const mockUsers = [
        {
          _id: 'userId1',
          userFirstName: 'Test',
          userLastName: 'User',
          email: 'testexample@gmail.com',
          password: 'password'
        }
      ];
      User.find.mockResolvedValue(mockUsers);
      const req = {};
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      await getAllUsers(req, res);

      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Internal server error';
      User.find.mockRejectedValue(new Error(errorMessage));
      const req = {};
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      await getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  // getUser
});
