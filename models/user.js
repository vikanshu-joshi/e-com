const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const schema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  created: {
    type: Number,
    default: Math.floor(+new Date() / 1000),
  },
});

schema.methods.authToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

module.exports = mongoose.model("Users", schema);
