const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const findEmailCust = await Customer.findOne({ email: email });
  if (!findEmailCust) {
    return res.status(404).json({
      message: "Email not found",
      status: "Failed",
    });
  }

  const findPassword = findEmailCust.password;
  if (findPassword != password) {
    return res.status(404).json({
      message: "Password incorrect",
      status: "Failed",
    });
  }

  if (findEmailCust && findPassword) {
    return res.status(200).json({
      message: "Successfully login",
      status: "Success",
      idCustomer: findEmailCust.id,
    });
  }
});

router.post("/register", async (req, res) => {
  const customer = new Customer(req.body);

  customer.uploadAt = new Date().toISOString();
  customer.updatedAt = customer.uploadAt;

  const findMobile = await Customer.findOne({ mobile: req.body.mobile });
  const findEmail = await Customer.findOne({ email: req.body.email });

  if (findMobile || findEmail) {
    return res.status(400).json({
      message: "Email or mobile already exist",
      status: "Failed",
    });
  }

  if (customer.gender != "male" && customer.gender != "female") {
    return res.status(400).json({
      message: "Gender incorrect",
      status: "Failed",
    });
  }

  const savedCustomer = await customer.save();
  res.status(201).json({
    message: "Customer added successfully",
    status: "Success",
    data: savedCustomer,
  });
});

router.get("/:_id", async (req, res) => {
  const { _id } = req.params;

  const findCustomer = await Customer.findById(_id);

  if (!findCustomer) {
    return res.status(404).json({
      message: "Failed to find customer",
      status: "Failed",
    });
  }

  res.status(200).json({
    message: "Successfully find customer",
    status: "Success",
    data: findCustomer,
  });
});

router.put("/:_id", async (req, res) => {
  const { _id } = req.params;

  const findCustomer = await Customer.findById(_id);

  if (!findCustomer) {
    return res.status(404).json({
      message: "Failed to update data. Customer not found",
      status: "Failed",
    });
  }

  const { name, mobile, email, password, photo, age, gender, address } =
    req.body;

  if (gender != "male" && gender != "female" && gender != null) {
    return res.status(400).json({
      message: "Gender incorrect",
      status: "Failed",
    });
  }

  const customerUpdate = await Customer.findByIdAndUpdate(
    _id,
    {
      name,
      mobile,
      email,
      password,
      photo,
      age,
      gender,
      address,
      updatedAt: new Date().toISOString(),
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    message: "Succssfully update customer",
    status: "Success",
    data: customerUpdate,
  });
});

router.delete("/:_id", async (req, res) => {
  const { _id } = req.body;

  const findCustomerId = await Customer.findById(_id);
  if (!findCustomerId) {
    return res.status(404).json({
      message: "Customer failed to delete",
      status: "Failed",
    });
  }

  await Customer.findByIdAndDelete(_id);
  res.status(201).json({
    message: "Successfully delete customer",
    status: "Success",
  });
});

module.exports = router;
