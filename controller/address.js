const UserModel = require("../models/user");
const verifyToken = require("../utilities/verifyToken");
const AddressModel = require("../models/addresses");

const addAddress = async (req, res) => {
  const id = verifyToken(req, res);
  if (!id) {
    return;
  }
  const address = new AddressModel({
    phone: req.body.phone,
    address: [req.body.line1, req.body.line2, req.body.line3],
    pincode: req.body.pincode,
    landmark: req.body.landmark,
    name: req.body.name,
  });
  await address.save();
  await UserModel.findByIdAndUpdate(
    id,
    {
      $push: { addresses: address._id },
    },
    { new: true, upsert: true }
  );
  return res.send({
    status: 1,
    error: "",
    message: "Address added",
    data: address,
  });
};

const delAddress = async (req, res) => {
  const id = verifyToken(req, res);
  if (!id) {
    return;
  }
  const addressId = req.params.id;
  await AddressModel.findByIdAndDelete(addressId);
  await UserModel.findByIdAndUpdate(id, { $pull: { addresses: addressId } });
  return res.send({
    status: 1,
    error: "",
    message: "Address deleted",
    data: {},
  });
};

const getAddresses = async (req, res) => {
  const id = verifyToken(req, res);
  if (!id) {
    return;
  }
  const user = await UserModel.findById(id).populate("addresses");
  return res.send({
    status: 1,
    error: "",
    message: "",
    data: user.addresses,
  });
};

module.exports = {
  addAddress,
  delAddress,
  getAddresses,
};
