const UserModel = require("../models/user");

const getProfile = async (req, res) => {
  const id = req.user;
  const user = await UserModel.findById(id);
  return res.send({
    status: 1,
    error: "",
    message: "",
    data: user,
  });
};

module.exports = {
  getProfile,
};
