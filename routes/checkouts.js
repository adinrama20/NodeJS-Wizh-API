const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Checkout = require("../models/Checkout");

router.post("/", async (req, res) => {
  const checkout = new Checkout(req.body);

  const findCheckoutRoomId = await Checkout.findOne({
    room_id: req.body.room_id,
  });
  if (findCheckoutRoomId) {
    return res.status(400).json({
      message: "Room record already exist",
      status: "Failed",
    });
  }

  const findRoomId = await Cart.findOne({ room_id: req.body.room_id });
  if (!findRoomId) {
    return res.status(400).json({
      message: "Failed to checkout room. Room not found in cart",
      status: "Failed",
    });
  }

  checkout.status = "Success";
  checkout.uploadAt = new Date().toISOString();
  checkout.updatedAt = checkout.uploadAt;

  const savedCheckout = await checkout.save();
  res.status(201).json({
    message: "Successfully checkout room",
    status: "Success",
    data: savedCheckout,
  });
});

module.exports = router;
