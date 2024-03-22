//Developer: Vishal Vaid

const {
  getAllUsers,
  deleteContact,
  updateUser,
  getUser,
  createUser
} = require('../controllers/userCont');
const User = require('../schemas/userSchema');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Model.findByIdAndUpdate = jest.fn();

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
  describe('getUser function', () => {
    it('should return user details when valid user id is provided', async () => {
      const mockUser = {
        _id: 'userId1',
        userFirstName: 'Test',
        userLastName: 'User',
        email: 'examtest@gmail.com',
        password: 'OyVey123!'
      };

      const req = { params: { id: 'userId1' } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      User.findById = jest.fn().mockResolvedValue(mockUser);

      await getUser(req, res);

      expect(User.findById).toHaveBeenCalledWith('userId1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return 404 status and error message when user is not found', async () => {
      const req = { params: { id: 'invalidUserId' } };
      const res = {
        status: jest.fn(() => res),
        send: jest.fn()
      };

      User.findById = jest.fn().mockResolvedValue(null);

      await getUser(req, res);

      expect(User.findById).toHaveBeenCalledWith('invalidUserId');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('User not found');
    });

    it('should return 400 status and error message when invalid user id is provided', async () => {
      const req = { params: { id: 'invalidUserId' } };
      const res = {
        status: jest.fn(() => res),
        send: jest.fn()
      };
      const mongoose = require('mongoose');

      const mockError = new mongoose.Error.CastError('Invalid user id', 'userId1', 'User');

      User.findById = jest.fn().mockRejectedValue(mockError);

      await getUser(req, res);

      expect(User.findById).toHaveBeenCalledWith('invalidUserId');
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith('Invalid user id');
    });

    it('should return 500 status and error message when an error occurs during database operation', async () => {
      const req = { params: { id: 'userId1' } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      const mockError = new Error('Database error');

      User.findById = jest.fn().mockRejectedValue(mockError);

      await getUser(req, res);

      expect(User.findById).toHaveBeenCalledWith('userId1');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });

  //deleteContact
  describe('Delete user', () => {
    it('should delete a user', async () => {
      // Mocking User.findByIdAndDelete method
      const mockUser = {
        _id: 'userId1',
        userFirstName: 'Test',
        userLastName: 'User',
        email: 'examtest@gmail.com',
        password: 'OyVey123!'
      };
      const mockFindByIdAndDelete = jest.fn().mockResolvedValue(mockUser);
      const User = require('../schemas/userSchema');
      User.findByIdAndDelete = mockFindByIdAndDelete;

      // Mock request and response objects
      const mockReq = { params: { id: 'userId1' } };
      const mockRes = {
        status: jest.fn().mockReturnThis(), // Mocking res.status chaining
        send: jest.fn(),
        json: jest.fn()
      };

      // Call the deleteContact function
      await deleteContact(mockReq, mockRes);

      // Assertion
      expect(mockFindByIdAndDelete).toHaveBeenCalledWith('userId1');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockUser);
    });

    it('should handle invalid user ID', async () => {
      // Mocking User.findByIdAndDelete method to return null (no user found)
      const mockFindByIdAndDelete = jest.fn().mockResolvedValue(null);
      const User = require('../schemas/userSchema');
      User.findByIdAndDelete = mockFindByIdAndDelete;

      // Mock request and response objects
      const mockReq = { params: { id: 'invalidId' } };
      const mockRes = {
        status: jest.fn().mockReturnThis(), // Mocking res.status chaining
        send: jest.fn()
      };

      // Call the deleteContact function
      await deleteContact(mockReq, mockRes);

      // Assertion
      expect(mockFindByIdAndDelete).toHaveBeenCalledWith('invalidId');
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith('User not found');
    });

    it('should handle internal server error', async () => {
      // Mocking User.findByIdAndDelete method to throw an error
      const mockFindByIdAndDelete = jest.fn().mockRejectedValue(new Error('Internal server error'));
      const User = require('../schemas/userSchema');
      User.findByIdAndDelete = mockFindByIdAndDelete;

      // Mock request and response objects
      const mockReq = { params: { id: 'userId1' } };
      const mockRes = {
        status: jest.fn().mockReturnThis(), // Mocking res.status chaining
        json: jest.fn()
      };

      // Call the deleteContact function
      await deleteContact(mockReq, mockRes);

      // Assertion
      expect(mockFindByIdAndDelete).toHaveBeenCalledWith('userId1');
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  //createUser
  describe('createUser controller', () => {
    let req, res;

    beforeEach(() => {
      req = mockRequest();
      res = mockResponse();
    });

    it('should handle internal server errors', async () => {
      req.body = {
        userFirstName: 'John',
        userLastName: 'Doe',
        password: 'password',
        email: 'john.doe@example.com'
      };

      // Mocking bcrypt.hash to throw an error
      bcrypt.hash = jest.fn(() => {
        throw new Error('Mocked bcrypt error');
      });

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Internal server error'
      });
    });
  });

  //updateUser
  describe('updateUser controller', () => {
    let req, res;

    beforeEach(() => {
      req = mockRequest();
      res = mockResponse();
    });

    it('should call updateUser function', async () => {
      // Mock updateUser function
      const updateUserMock = jest.fn(updateUser);

      await updateUserMock(req, res);

      // Check if updateUser function is called
      expect(updateUserMock).toHaveBeenCalled();
    });
  });
});
