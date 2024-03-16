//Controller incharge or adding and removing comments from the database
// Dev: Dayan F

//TODO: GetAll ingredients function (GET)
//TODO: Add ingredient function (POST)
//TODO: Remove ingredient function (DELETE)
//TODO: Update ingredient function (PUT)
//TODO: Get ingredient by ID function or by name (GET)

const mongoose = require('mongoose');
const Comment = require('../schemas/commentsSchema');

//GetAllIngredients
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GetIngredientById with Validation
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//CreateIngredient with Validation
exports.createcomment = async (req, res) => {
  const comment = new Comment({
    name: req.body.name,
    comment: req.body.comment,
  });

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//UpdateIngredient with Validation
exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'comment not found' });
    }
    comment.name = req.body.name;
    comment.comment = req.body.comment;

    const updatedComment = await comment.save();
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//DeleteIngredient with Validation
exports.deleteComment = async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      const result = await Model.deleteOne({ _id: comment });
      console.log(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
