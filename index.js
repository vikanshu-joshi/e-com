const express = require("express");
const mongoose = require("mongoose");

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

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
app.listen(PORT, () => console.log("Server started at port ", PORT));
