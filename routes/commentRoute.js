const express = require('express');
const router = express.Router();
const comCont = require('../controllers/commentCont');

// Get all comments
router.get('/', comCont.getComments);

// Create a new comment
router.post('/', comCont.createcomment);

// Get a comment by ID
router.get('/:id', comCont.getCommentById);

// Update a comment by ID
router.put('/:id', comCont.updateComment);

// Delete a comment by ID
router.delete('/:id', comCont.deleteComment);

module.exports = router;
