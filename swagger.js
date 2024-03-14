const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'CookBook Recipe API'
  },
  host: 'localhost:3000',
  schemes: ['https'],
  tags: [
    { name: 'Recipes', description: 'API for recipes in the system', paths: ['recipes']},
    { name: 'Users', description: 'API for users in the system' },
    { name: 'Ingredients', description: 'API for ingredients in the system'},
    { name: 'Posts', description: 'API for posts in the system'}
  ]
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
