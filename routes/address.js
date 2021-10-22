const express = require("express");
const mongoose = require("mongoose");
const addressController = require("../controller/address");

const router = express.Router();

router.post("/add", addressController.addAddress);

router.delete("/delete/:id", addressController.delAddress);

router.get("/getAddresses", addressController.getAddresses);

module.exports = router;
