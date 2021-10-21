const express = require('express');
const router = express.Router();

const {getProducts, getProductsSearch, getCategories, createProduct} = require("../controller/products");

router.post('/createProduct',createProduct)
router.get('/getProducts', getProducts);
router.get('/getProductsSearch', getProductsSearch);
router.get('/getCategories', getCategories);

module.exports = router;
