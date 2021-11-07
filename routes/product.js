const express = require('express');
const product = express.Router();
const productController = require('../controllers/product-controller');

product.get('/products', productController.allProducts);
product.get('/product/brands', productController.allProductBrands);
product.get('/product/categories', productController.allProductCategories);


module.exports = product;