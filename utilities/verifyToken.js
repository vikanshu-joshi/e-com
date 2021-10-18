const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res) {
  let ownerId = "";
  const token = req.header("x-auth-token");
  if (token == undefined) {
    res
      .status(400)
      .send({ status: 0, error: "Token not provided", message: "", data: {} });
    return undefined;
  } else {
    try {
      const payload = jwt.verify(token, config.get("jwtPrivateKey"));
      ownerId = payload._id;
      return ownerId;
    } catch (ex) {
      res
        .status(400)
        .send({ status: 0, error: "Invalid token", message: "", data: {} });
      return undefined;
    }
  }
};
