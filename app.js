require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const createPayment = require("./utils/function");

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(express.static("assets"));
app.use("/assets", express.static(__dirname + "/assets"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/detail", async (req, res) => {
  const { title, price, img, unit } = req.query;
  const product = {
    title,
    picture_url: img,
    quantity: parseInt(unit),
    unit_price: parseFloat(price),
  };
  const response = await createPayment(product);
  const data = { ...req.query, url: response.init_point };
  res.render("detail", data);
});

app.get("/success", (req, res) => {
  res.render("success", req.query);
});

app.get("/failure", (req, res) => {
  res.render("failure", req.query);
});

app.get("/pending", (req, res) => {
  res.render("pending", req.query);
});

app.post("/notifications", (req, res) => {
  console.log(req.query);
  res.status(200).json(req.query);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server listening on port:", port));
