const db = require("../database/db");

const cartSchema = new db.Schema({
  room_id: {
    type: String,
    required: true,
  },
  uploadAt: String,
  updatedAt: String,
});

const Cart = db.model("carts", cartSchema);
module.exports = Cart;
