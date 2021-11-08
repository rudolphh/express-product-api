const express = require('express');
const user = express.Router();

const verifyJwt = require('../middlewares/verify-jwt');

// you can use the middleware like this but
// beware all routes/routers used after will also
// use the middleware
//user.use(verifyJwt);

const userController = require('../controllers/user-controller');

// so we can apply middleware to specific routes before the route handler
user.get('/users', userController.allUsers);
user.get('/user/favorites', verifyJwt, userController.allFavorites);
user.post('/user/favorite', verifyJwt, userController.addFavorite);
user.put('/user/favorite/:id', verifyJwt, userController.updateFavoriteNote);
user.delete('/user/favorite/:id', verifyJwt, userController.deleteFavorite);

module.exports = user;