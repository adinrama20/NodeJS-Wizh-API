const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Hotel = require("../models/Hotel");
const Villa = require("../models/Villa");

router.post("/:_id", async (req, res) => {
  const { _id } = req.params;
  const cart = new Cart(req.body);

  cart.uploadAt = new Date().toISOString();
  cart.updatedAt = cart.uploadAt;

  const findCart = await Cart.findOne({ room_id: cart.room_id });
  const findHotel = await Hotel.findById(_id);
  const findVilla = await Villa.findById(_id);

  if (findCart) {
    return res.status(400).json({
      message: "Room type already added in cart",
      status: "Failed",
    });
  } else if (findHotel) {
    for (i = 0; i < findHotel.room_type.length; i++) {
      if (cart.room_id == findHotel.room_type[i]._id) {
        const savedCart = await cart.save();
        return res.status(201).json({
          message: "Successfully added hotel room in cart",
          status: "Success",
          data: savedCart,
        });
      }
    }
  } else {
    for (i = 0; i < findVilla.room_type.length; i++) {
      if (cart.room_id == findVilla.room_type[i]._id) {
        const savedCart = await cart.save();
        return res.status(201).json({
          message: "Successfully added villa room in cart",
          status: "Success",
          data: savedCart,
        });
      }
    }
  }

  res.status(404).json({
    message: "Room not found",
    status: "Failed",
  });
});

router.get("/:_id", async (req, res) => {
  const { _id } = req.params;

  const findRoomInCart = await Cart.findById(_id);

  if (!findRoomInCart) {
    return res.status(404).json({
      message: "Room not found",
      status: "Failed",
    });
  }

  res.status(200).json({
    message: "Room found",
    status: "Success",
    data: findRoomInCart,
  });
});

router.delete("/:roomId", async (req, res) => {
  const { roomId } = req.body;

  const findCart = await Cart.findOne({ room_id: roomId });

  if (!findCart) {
    return res.status(404).json({
      message: "Room type not found on cart",
      status: "Failed",
    });
  }

  await Cart.findByIdAndDelete({ _id: roomId });
  res.status(201).json({
    message: "Successfully remove room from cart",
    status: "Success",
  });
});

module.exports = router;
