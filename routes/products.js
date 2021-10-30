const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getProduct,
  getProductsSearch,
  getCategories,
  createProduct,
} = require("../controller/products");

router.post("/createProduct", createProduct);
router.get("/getProduct/:pid", auth, getProduct);
router.get("/getProductsSearch", getProductsSearch);
router.get("/getCategories", getCategories);

module.exports = router;
