const mongoose = require("mongoose");

options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.log(`Error connecting to DB: ${err}`);
    });
};

module.exports = connectDB;
