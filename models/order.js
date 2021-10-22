const mongoose = require("mongoose");
const TABLES = require("../variables/tables");

const schema = new mongoose.Schema({
  items: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: TABLES.PRODUCTS_TABLE,
  },
  total: Number,
  status: {
    type: String,
    enum: ["placed", "delievered", "cancelled"],
    default: "placed",
  },
  payment: {
    type: String,
    enum: ["cod", "card", "upi"],
    default: "placed",
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

module.exports = mongoose.model(TABLES.ORDERS_TABLE, schema);
