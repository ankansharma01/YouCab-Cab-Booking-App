const mongoose = require("mongoose");
function dbConnect() {
  mongoose
    .connect(process.env.CONNECT_DB)
    .then(() => console.log("Connected to db"))
    .catch((err) => console.log(err));
}

module.exports = dbConnect;
