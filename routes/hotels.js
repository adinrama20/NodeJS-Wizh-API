const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel");

router.post("/", async (req, res) => {
  const hotels = new Hotel(req.body);

  hotels.uploadAt = new Date().toISOString();
  hotels.updatedAt = hotels.uploadAt;

  const findHotelName = await Hotel.findOne({ name: req.body.name });

  if (findHotelName) {
    return res.status(400).json({
      message: "Hotel already exist",
      status: "Failed",
    });
  }

  if (hotels.facilities.pets != "yes" && hotels.facilities.pets != "no") {
    return res.status(400).json({
      message: "Pets input format incorrect",
      status: "Failed",
    });
  }

  const savedHotel = await hotels.save();
  res.status(201).json({
    message: "Successfully add hotel",
    status: "Success",
    data: savedHotel,
  });
});

router.get("/:_id", async (req, res) => {
  const { _id } = req.params;

  const findHotel = await Hotel.findById(_id);

  if (!findHotel) {
    return res.status(404).json({
      message: "Hotel not found",
      status: "Failed",
    });
  }

  res.status(200).json({
    message: "Hotel is found",
    status: "Success",
    data: findHotel,
  });
});

router.get("/:idHotel/:idRoom", async (req, res) => {
  const { idHotel, idRoom } = req.params;

  const findHotel = await Hotel.findById({ _id: idHotel });

  if (!findHotel) {
    return res.status(404).json({
      message: "Hotel not found",
      status: "Failed",
    });
  }

  const rooms = findHotel.room_type;

  for (i = 0; i < rooms.length; i++) {
    if (idRoom == rooms[i]._id) {
      return res.status(200).json({
        message: "Room is found",
        status: "Success",
        data: rooms[i],
      });
    }
  }

  res.status(404).json({
    message: "Room not found",
    status: "Failed",
  });
});

module.exports = router;
