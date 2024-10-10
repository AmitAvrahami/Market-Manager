const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./db/db");
const productRoutes = require("./routes/ProductRoute");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api", productRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
