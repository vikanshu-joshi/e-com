const express = require("express");
const cartController = require("../controller/cart");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/get", auth, cartController.getCart);

router.post("/add-item", auth, cartController.addItem);

router.delete("/remove-item/:id", auth, cartController.deleteItem);

module.exports = router;
