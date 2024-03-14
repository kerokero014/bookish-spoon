const express = require('express');
const router = express.Router();

//Routes for recipes
router.use('/recipes', require('./recipeRoutes'));

//TODO: Uncomment Route as you finish the Controller for your Controller

//routes for users
router.use('/users', require('./userRoutes'));

//routes for ingredients
//router.use('/ingredients', require('./ingredientsRoutes'));

//Routes for posts
router.use('/posts', require('./postsRoutes'));

//swagger
//router.use('/', require('./swagger'))

module.exports = router;
