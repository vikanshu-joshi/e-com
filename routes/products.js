const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getProduct,
  bySearch,
  byCategory,
  createProduct,
} = require("../controller/products");

router.post("/createProduct", createProduct);
router.get("/getProduct/:pid", auth, getProduct);
router.get("/bySearch", bySearch);
router.get("/byCategory", byCategory);

module.exports = router;
