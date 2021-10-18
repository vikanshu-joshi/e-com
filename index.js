const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authController = require("./routes/auth");

if (!config.get("jwtPrivateKey")) {
  console.error("jwtPrivateKey Error");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost:27017/ecom", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.log(err));
// mongoose
//   .connect(
//     "mongodb+srv://admin:53ua44HrHDhP7Exv@cluster0.w0uci.mongodb.net/ecom",
//     {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//     }
//   )
//   .then(() => console.log("Connected to database..."))
//   .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authController);

const PORT = 3000;
app.listen(PORT, () => console.log("Server started at port ", PORT));
