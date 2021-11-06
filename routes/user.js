const express = require("express");
const userController = require("../controller/user");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/profile", auth, userController.getProfile);

// router.post("/add-item", auth, cartController.addItem);

// router.delete("/remove-item/:id", auth, cartController.deleteItem);

module.exports = router;
