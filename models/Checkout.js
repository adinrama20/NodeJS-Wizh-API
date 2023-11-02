const db = require("../database/db");

const checkoutSchema = new db.Schema({
  room_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Success", "Failed"],
  },
  uploadAt: String,
  updatedAt: String,
});

const Checkout = db.model("checkouts", checkoutSchema);
module.exports = Checkout;
