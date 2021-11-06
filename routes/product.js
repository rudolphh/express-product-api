const express = require('express');

const product = express.Router();

product.use(express.json());
product.use(express.urlencoded({ extended: true }));

const productController = require('../controllers/product-controller');

product.get('/products', productController.allProducts);
product.get('/product/brands', productController.allProductBrands);
product.get('/product/categories', productController.allProductCategories);


module.exports = product;