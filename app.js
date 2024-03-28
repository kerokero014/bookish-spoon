const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const mongoose = require('mongoose');
const env = require('dotenv').config();
const routes = require('./routes');
const cors = require('cors');
//const { auth } = require('express-oauth2-jwt-bearer');

// Auth0 setup
//const jwtCheck = auth({
//  audience: 'https://CookingRecipe-api.com',
//  issuerBaseURL: 'https://dev-sa6dftpsfnputuuv.us.auth0.com/',
//  tokenSigningAlg: 'RS256'
//});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB Connected');
  })
  .catch((err) => {
    console.error(`DB Connection Error: ${err.message}`);
  });

// Middleware setup
//app.use(jwtCheck);

app.use(express.json());
app.use(cors());

// Routes
app.use('/', routes);

// Start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
