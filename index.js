const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const authRoutes = require("./routes/auth");
const addressRoutes = require("./routes/address");
const cartRoutes = require("./routes/cart");
const productRoutes = require("./routes/products");

const ProductModel = require("./models/products");

if (!config.get("jwtPrivateKey")) {
  console.error("jwtPrivateKey Error");
  process.exit(1);
}

// mongoose
//   .connect("mongodb://localhost:27017/ecom", {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("Connected to database..."))
//   .catch((err) => console.log(err));
mongoose
    .connect(
        "mongodb+srv://admin:53ua44HrHDhP7Exv@cluster0.w0uci.mongodb.net/ecom",
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }
    )
    .then(() => console.log("Connected to database..."))
    .catch((err) => console.log(err));

const categories = async () => {
  const c = await ProductModel.find({}, "-_id")
    .select("product_category_tree")
    .lean();
  const mainCategory = [];
  const subCategory = [];
  const leafCategory = [];
  for (let i = 0; i < c.length; i++) {
    mainCategory.push(c[i]["product_category_tree"][0]);
    subCategory.push(c[i]["product_category_tree"][1]);
    if (c[i]["product_category_tree"][2]) {
      leafCategory.push(c[i]["product_category_tree"][2]);
    }
  }
  console.log(mainCategory.length, subCategory.length, leafCategory.length);
  const uniquemainCategory = [...new Set(mainCategory)];
  const uniqueSubCategory = [...new Set(subCategory)];
  const uniqueLeafCategory = [...new Set(leafCategory)];
  console.log(
    uniquemainCategory.length,
    uniqueSubCategory.length,
    uniqueLeafCategory.length
  );
};


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/addresses", addressRoutes);
app.use("/cart", cartRoutes);
app.use("/product", productRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  categories();
  console.log("Server started at port ", PORT);
});
