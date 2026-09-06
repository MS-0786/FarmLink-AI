const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Create a new order
router.post("/", async (req, res) => {
  try {
    console.log("ORDER RECEIVED:", req.body);

    const order = new Order(req.body);

    const savedOrder = await order.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("ORDER ERROR:", error);

    res.status(400).json({
      message: error.message,
    });
  }
});

// Get orders for a farmer
router.get("/farmer/:farmerId", async (req, res) => {
  try {
    const { farmerId } = req.params;

    const orders = await Order.find({ farmerId }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    console.error("GET FARMER ORDERS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;