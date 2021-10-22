const mongoose = require("mongoose");
const TABLES = require("../variables/tables");

const schema = new mongoose.Schema({
  phone: Number,
  address: [String],
  pincode: Number,
  landmark: String,
  name: String,
});

module.exports = mongoose.model(TABLES.ADDRESS_TABLE, schema);
