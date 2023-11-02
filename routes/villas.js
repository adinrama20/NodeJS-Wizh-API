const express = require("express");
const router = express.Router();
const Villa = require("../models/Villa");

router.post("/", async (req, res) => {
  const villas = new Villa(req.body);

  villas.uploadAt = new Date().toISOString();
  villas.updatedAt = villas.uploadAt;

  const findVillaName = await Villa.findOne({ name: req.body.name });

  if (findVillaName) {
    return res.status(400).json({
      message: "Villa already exist",
      status: "Failed",
    });
  }

  if (villas.facilities.pets != "yes" && villas.facilities.pets != "no") {
    return res.status(400).json({
      message: "Pets input format incorrect",
      status: "Failed",
    });
  }

  const savedVilla = await villas.save();
  res.status(201).json({
    message: "Successfully add villa",
    status: "Success",
    data: savedVilla,
  });
});

router.get("/:_id", async (req, res) => {
  const { _id } = req.params;

  const findVilla = await Villa.findById(_id);

  if (!findVilla) {
    return res.status(404).json({
      message: "Villa not found",
      status: "Failed",
    });
  }

  res.status(200).json({
    message: "Villa is found",
    status: "Success",
    data: findVilla,
  });
});

router.get("/:idVilla/:idRoom", async (req, res) => {
  const { idVilla, idRoom } = req.params;

  const findVilla = await Villa.findById({ _id: idVilla });

  if (!findVilla) {
    return res.status(404).json({
      message: "Villa not found",
      status: "Failed",
    });
  }

  const rooms = findVilla.room_type;

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
