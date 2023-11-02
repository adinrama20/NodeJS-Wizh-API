const db = require("../database/db");

const promoCodeSchema = new db.Schema({
  code: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Valid", "Invalid"],
    required: true,
  },
  uploadAt: String,
  updatedAt: String,
});

const PromoCode = db.model("promo_codes", promoCodeSchema);
module.exports = PromoCode;
