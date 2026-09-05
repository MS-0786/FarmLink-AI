const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Add a new product
router.post("/", async (req, res) => {
  try {
    console.log("BACKEND RECEIVED:", req.body);

    const product = new Product(req.body);
    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;