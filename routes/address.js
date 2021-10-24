const express = require("express");
const addressController = require("../controller/address");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/add", auth, addressController.addAddress);

router.delete("/delete/:id", auth, addressController.delAddress);

router.get("/getAddresses", auth, addressController.getAddresses);

module.exports = router;
