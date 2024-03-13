const express = require("express");
const router = express.Router();
const PostCont = require("../controllers/postCont");

// Get all posts
router.get("/", PostCont.getPosts);

// Create a new post
router.post("/", PostCont.createPost);

// Get a post by ID
router.get("/:id", PostCont.getPostById);

// Update a post by ID
router.put("/:id", PostCont.updatePost);

// Delete a post by ID
router.delete("/:id", PostCont.deletePost);

module.exports = router;