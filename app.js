const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const cobaDB = require("./database/db");
const indexRouter = require("./routes/index");
const customersRouter = require("./routes/customers");
const hotelsRouter = require("./routes/hotels");
const villasRouter = require("./routes/villas");
const blogsRouter = require("./routes/blogs");
const cartsRouter = require("./routes/carts");
const checkoutsRouter = require("./routes/checkouts");
const promoCodesRouter = require("./routes/promo_codes");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

cobaDB;

app.use("/", indexRouter);
app.use("/v1/customers", customersRouter);
app.use("/v1/hotels", hotelsRouter);
app.use("/v1/villas", villasRouter);
app.use("/v1/blogs", blogsRouter);
app.use("/v1/carts", cartsRouter);
app.use("/v1/checkouts", checkoutsRouter);
app.use("/v1/promo-codes", promoCodesRouter);

module.exports = app;
