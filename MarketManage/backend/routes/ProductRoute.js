const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/products", async (req, res) => {
  const {
    productName,
    productDescription,
    productType,
    marketingDate,
    productSerialNumber,
    _id,
    additionalFields,
  } = req.query;

  const query = {};

  if (productName) query.name = productName;
  if (productDescription) query.description = productDescription;
  if (productType) query.type = productType;
  if (marketingDate) query.marketingDate = marketingDate;
  if (productSerialNumber) query.serialNumber = productSerialNumber;
  if (_id) query._id = _id;
  console.log("arrived");

  try {
    const allProducts = await Product.find(query);
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products", details: error });
  }
});

router.get("/products/new", (req, res) => {
  const newProduct = new Product();
  console.log(newProduct);

  try {
    res.status(200).send(newProduct);
  } catch (error) {
    console.error("Error creating new product:", error);
    res.status(500).send("Error creating new product");
  }
});

router.post("/products", async (req, res) => {
  console.log("add");
  const newProduct = new Product(req.body);
  newProduct.isNew = false;
  console.log(newProduct);
  try {
    const newProduct = new Product(req.body);
    console.log("try save");
    await newProduct.save();
    res.status(201).send(newProduct);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.patch("/products/:id", async (req, res) => {
  console.log("update");

  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    console.log("patch success");
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Error updating product" });
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).send({ sucsses: false });
    }
    console.log(product);
    res.status(200).send({ sucsses: true });
  } catch (error) {
    res.status(500).send({ sucsses: false, error });
  }
});

module.exports = router;
