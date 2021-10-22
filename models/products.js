const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  product_name: String,
  product_category_tree: [String],
  retail_price: Number,
  discounted_price: Number,
  image: [String],
  product_rating: String,
  overall_rating: Number,
  brand: String,
});

module.exports = mongoose.model("Products", schema);
