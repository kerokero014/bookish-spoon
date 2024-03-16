const express = require('express');
const router = express.Router();

//TODO: Uncomment Route as you finish the Controller for your Controller

//Routes for recipes
router.use('/recipes', require('./recipeRoutes'));
//
////routes for users
router.use('/users', require('./userRoutes'));
//
////routes for ingredients
router.use('/ingredients', require('./ingredientRoute'));
//
////routes for comments
router.use('/comments', require('./commentRoute'));
//
//Routes for posts
router.use('/posts', require('./postsRoutes'));
//
//swagger
router.use('/', require('./swagger'));

module.exports = router;
