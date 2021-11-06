const express = require('express');
const user = express.Router();

user.use(express.json());
user.use(express.urlencoded({ extended: true }));

const verifyJwt = require('../middlewares/verify-jwt');
// you can use the middleware like this for all routes below app.use
user.use(verifyJwt);

const userController = require('../controllers/user-controller');

user.get('/users', userController.allUsers);
user.get('/user/favorites', userController.allFavorites);
user.post('/user/favorite', userController.addFavorite);
user.put('/user/favorite/:id', userController.updateFavoriteNote);
user.delete('/user/favorite/:id', userController.deleteFavorite);

module.exports = user;