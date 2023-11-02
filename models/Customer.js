const db = require("../database/db");

const addressSchema = new db.Schema({
  street: {
    type: String,
    required: true,
  },
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

const customerSchema = new db.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  address: addressSchema,
  uploadAt: String,
  updatedAt: String,
});

const Customer = db.model("customers", customerSchema);
module.exports = Customer;
