const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const TABLES = require("../variables/tables");

const schema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  orders: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: TABLES.ORDERS_TABLE,
    default: [],
  },
  cart: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: TABLES.PRODUCTS_TABLE,
    default: [],
  },
  saved: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: TABLES.PRODUCTS_TABLE,
    default: [],
  },
  addresses: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: TABLES.ADDRESS_TABLE,
    default: [],
  },
  login_history: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: TABLES.LOGIN_HISTORY,
    default: [],
  },
  created: {
    type: Number,
    default: Math.floor(+new Date() / 1000),
  },
});

schema.methods.authToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

module.exports = mongoose.model(TABLES.USERS_TABLE, schema);
