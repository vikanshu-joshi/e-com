const validator = require("validator");
const UserModel = require("../models/user");
const verifyToken = require("../utilities/verifyToken");

const login = async (req, res) => {
  if (!req.body.email && !validator.isEmail(`${req.body.email}`)) {
    return res.status(400).send({
      status: 0,
      error: "Invalid email address",
      message: "",
      data: {},
    });
  } else if (!req.body.password) {
    return res.status(400).send({
      status: 0,
      error: "Invalid password",
      message: "",
      data: {},
    });
  }
  const user = await UserModel.findOne({
    email: req.body.email,
    password: req.body.password,
  }).select("-password");
  if (user) {
    return res.send(user);
  }
  return res
    .status(400)
    .send({ status: 0, error: "User not found", message: "", data: {} });
};

const signup = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;

  const value = await UserModel.findOne({ email: email });

  if (value) {
    return res.status(400).send({
      status: 0,
      error: "User already exists",
      message: "",
      data: {},
    });
  }

  const user = new UserModel({
    name: name,
    email: email,
    phone: phone,
    password: password,
  });

  user
    .save()
    .then((result) => {
      const data = { ...result._doc, token: result.authToken() };
      delete data.password;
      delete data.__v;
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send({ error: "Something wen't wrong" });
    });
};

const forgotPassword = async (req, res) => {
  const email = req.body.email;
  if (!email && !validator.isEmail(`${email}`)) {
    return res.status(400).send({
      status: 0,
      error: "Invalid email",
      message: "",
      data: {},
    });
  }
};

const changePassword = async (req, res) => {
  const id = verifyToken(req, res);
  if (!id) {
    return;
  }

  const value = await UserModel.findOne({ _id: id });

  if (!req.body.oldPassword || req.body.oldPassword != value.password) {
    return res.status(400).send({
      status: 0,
      error: "Invalid password",
      message: "",
      data: {},
    });
  }

  if (!req.body.newPassword) {
    return res.status(400).send({
      status: 0,
      error: "Invalid new password",
      message: "",
      data: {},
    });
  }

  if (String(req.body.newPassword).length < 8) {
    return res.status(400).send({
      status: 0,
      error: "New Password must be greater than 8 characters",
      message: "",
      data: {},
    });
  }

  UserModel.findOneAndUpdate(
    { _id: id },
    { password: req.body.newPassword },
    { upsert: true },
    function (err, doc) {
      if (err)
        return res.send(500, {
          status: 0,
          error: err,
          message: "Something wen't wrong",
          data: "",
        });
      return res.send({
        status: 1,
        error: "",
        message: "Password changed",
        data: "",
      });
    }
  );
};

module.exports = {
  login,
  signup,
  forgotPassword,
  changePassword,
};
