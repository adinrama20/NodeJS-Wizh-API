require("dotenv").config();
const { DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;
const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@dbdeployments.bgpd7js.mongodb.net/?retryWrites=true&w=majority`,
    {
      dbName: `${DB_NAME}`,
    }
  )
  .then(() => console.log("Success connect to MongoDB"))
  .catch((err) => console.error("Failed connect to MongoDB", err));

module.exports = mongoose;
