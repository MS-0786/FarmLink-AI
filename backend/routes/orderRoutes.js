const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Create a new order
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);

    const savedOrder = await order.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// Update delivery status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "In Transit",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status;

    const updatedOrder = await order.save();

    res.json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// Update driver GPS location
router.patch("/:id/location", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        message: "Latitude and longitude are required",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.driverLocation = {
      latitude,
      longitude,
      updatedAt: new Date(),
    };

    const updatedOrder = await order.save();

    res.json({
      message: "Driver location updated successfully",
      driverLocation: updatedOrder.driverLocation,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// Cancel an order
router.patch("/:id/cancel", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.status === "Delivered") {
      return res.status(400).json({
        message: "Delivered orders cannot be cancelled",
      });
    }

    if (order.status === "Cancelled") {
      return res.status(400).json({
        message: "Order is already cancelled",
      });
    }

    order.status = "Cancelled";

    const updatedOrder = await order.save();

    res.json({
      message: "Order cancelled successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;