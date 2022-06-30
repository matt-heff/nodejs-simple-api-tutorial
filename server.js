//import products from "./products.json";
let products = require("./products.json");
console.log(products);
const express = require("express");

const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:9999",
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Get functions
app.get("/product", function (req, res) {
  res.json(products);
});

app.get("/product/:id", function (req, res) {
  let item = products.find((product) => product.id === req.params.id);
  res.json(item);
});

// delete functions
app.delete("/product/:id", function (req, res) {
  let tmp = products.filter((item) => item.id !== req.params.id);
  products = tmp;
  //res.json(item);
  console.log(products);
  res.send(products);
});

//put functions
app.put("/product/:id", function (req, res) {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  console.log(req.body);

  let index = products.findIndex((x) => x.id == req.params.id);
  products[index] = req.body;

  console.log(products);
  res.json(products);
});

// post functions
app.post("/product", function (req, res) {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let index = products.findIndex((x) => x.id == req.body.id);
  if (index !== -1) {
    res.status(400).send({
      message: `Item already exists wth the ID: ${req.body.id}`,
    });
  }

  products.push(req.body);
  res.json(products);
});

var server = app.listen(9999, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
