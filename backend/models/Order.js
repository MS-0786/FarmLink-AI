const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    buyerName: {
      type: String,
      required: true,
    },

    buyerEmail: {
      type: String,
      required: true,
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        cropName: {
          type: String,
          required: true,
        },

        farmerName: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },

        pricePerKg: {
          type: Number,
          required: true,
        },

        totalPrice: {
          type: Number,
          required: true,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "In Transit", "Delivered", "Cancelled"],
      default: "Pending",
    },
    driverLocation: {
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  updatedAt: {
    type: Date,
  },
},
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;