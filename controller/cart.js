const mongoose = require("mongoose");
const ProductModel = require("../models/products");
const UserModel = require("../models/user");

const getCart = async (req, res) => {
  const id = req.user;
  const user = await UserModel.findById(id).populate("cart");
  return res.send({
    status: 1,
    error: "",
    message: "",
    data: user.cart,
  });
};

const addItem = async (req, res) => {
  const id = req.user;
  if (!req.body.pid) {
    return res.send({
      status: 0,
      error: "Product id is required",
      message: "",
      data: "",
    });
  }
  const product = await ProductModel.findById(req.body.pid);
  await UserModel.findByIdAndUpdate(
    id,
    {
      $push: { cart: product._id },
    },
    { new: true, upsert: true }
  );
  const user = await UserModel.findById(id).populate("cart");
  return res.send({
    status: 0,
    error: "",
    message: "",
    data: user.cart,
  });
};

const deleteItem = async (req, res) => {
  const id = req.user;
  await UserModel.findByIdAndUpdate(id, { $pull: { cart: req.params.id } });
  const user = await UserModel.findById(id).populate("cart");
  return res.send({
    status: 0,
    error: "",
    message: "",
    data: user.cart,
  });
};

module.exports = {
  getCart,
  addItem,
  deleteItem,
};
