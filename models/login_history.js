const mongoose = require("mongoose");
const TABLES = require("../variables/tables");

const schema = new mongoose.Schema({
  browser: {
    type: String,
    default: "",
  },
  os: {
    type: String,
    default: "",
  },
  device: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  clientIp: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model(TABLES.LOGIN_HISTORY, schema);
