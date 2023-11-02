const express = require("express");
const router = express.Router();
const PromoCode = require("../models/PromoCode");

router.post("/", async (req, res) => {
  const promoCode = PromoCode(req.body);

  promoCode.uploadAt = new Date().toISOString();
  promoCode.updatedAt = promoCode.uploadAt;

  const findPromoCode = await PromoCode.findOne({ code: promoCode.code });

  if (findPromoCode) {
    return res.status(400).json({
      message: "Promo code already exist",
      status: "Failed",
    });
  }

  const savedPromoCode = await promoCode.save();
  res.status(201).json({
    message: "Promo code has successfully added",
    status: "Success",
    data: savedPromoCode,
  });
});

router.get("/:code", async (req, res) => {
  const { code } = req.params;

  const findCode = await PromoCode.findOne({ code: code });

  if (!findCode) {
    return res.status(404).json({
      message: "Promo code not found",
      status: "Failed",
    });
  }

  if (findCode.status == "Invalid") {
    return res.status(200).json({
      message: "Promo code can't be used",
      status: "Failed",
      data: findCode,
    });
  }

  res.status(200).json({
    message: "Congrats, promo code can be used",
    status: "Success",
    data: findCode,
  });
});

module.exports = router;
