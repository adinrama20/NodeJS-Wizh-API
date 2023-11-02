const db = require("../database/db");

const facilitiesSchema = new db.Schema({
  popular_facilities: [
    {
      type: String,
    },
  ],
  hotel_services: [
    {
      type: String,
    },
  ],
  public_facilities: [
    {
      type: String,
    },
  ],
  room_facilities: [
    {
      type: String,
    },
  ],
  health_and_medical_facilities: [
    {
      type: String,
    },
  ],
  pets: {
    type: String,
    enum: ["yes", "no"],
    required: true,
  },
});

const locationSchema = new db.Schema({
  city: {
    type: String,
    required: true,
  },
  postal_code: {
    type: Number,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
});

const roomTypeSchema = new db.Schema({
  room_name: {
    type: String,
    required: true,
  },
  guest: {
    type: Number,
    required: true,
  },
  king_bed: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const hotelSchema = new db.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  facilities: facilitiesSchema,
  review: {
    type: String,
    required: true,
  },
  location: locationSchema,
  about: {
    type: String,
    required: true,
  },
  room_type: [roomTypeSchema],
  uploadAt: String,
  updatedAt: String,
});

const Hotel = db.model("hotels", hotelSchema);
module.exports = Hotel;
