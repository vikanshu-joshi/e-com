const jwt = require("jsonwebtoken");

const config = require("config");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-auth-token"];

  if (!token) {
    return res
      .status(403)
      .send({
        status: 0,
        error: "Token not provided",
        message: "A token is required for authentication",
        data: {},
      });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
  } catch (err) {
    return res
      .status(401)
      .send({ status: 0, error: "Invalid token", message: "", data: {} });
  }
  return next();
};

module.exports = verifyToken;
