const express = require("express");
const mongoose = require("mongoose");
const loginController = require("../controller/auth");

const router = express.Router();

router.post("/login", loginController.login);

router.post("/create", loginController.signup);

router.post("/forgot-password", loginController.forgotPassword);

router.post("/change-password", loginController.changePassword);

module.exports = router;
