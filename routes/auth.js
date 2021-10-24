const express = require("express");
const loginController = require("../controller/auth");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/login", loginController.login);

router.post("/create", loginController.signup);

router.post("/forgot-password", auth, loginController.forgotPassword);

router.post("/change-password", auth, loginController.changePassword);

module.exports = router;
