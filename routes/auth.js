const express = require('express');

// Router is like express(), but more like a mini-app,
// ONLY capable of performing any given middleware functions ( w/ router.use)
// for the created endpoints.

// is used like middleware when the object exported (module.exports)
// is provided to the app.use to expand the routes of the application
const auth = express.Router();// could call it 'router' but 'auth' better choice

// bring in the authController object with its functions 
// for handling auth routes requests and responses
const authController = require('../controllers/auth-controller');

auth.post('/login', authController.login);
auth.post('/register', authController.register);

module.exports = auth;
