const express = require('express');
const router = express.Router();
const { auth } = require('express-oauth2-jwt-bearer');

//TODO: Uncomment Route as you finish the Controller for your Controller

//// Auth0 setup
const jwtCheck = auth({
  audience: 'https://CookingRecipe-api.com',
  issuerBaseURL: 'https://dev-sa6dftpsfnputuuv.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

//Routes for recipes
router.use('/recipes', require('./recipeRoutes'));
//
////routes for users
router.use('/users', jwtCheck,require('./userRoutes'));
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
