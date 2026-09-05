const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    farmerName: {
      type: String,
      required: true,
    },

    cropName: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    unit: {
      type: String,
      default: "kg",
    },

    location: {
      type: String,
      required: true,
    },

    pricePerKg: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;