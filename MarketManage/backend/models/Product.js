const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    maxLength: 50,
  },
  productSerialNumber: {
    type: Number,
    required: true,
    min: 0,
  },
  producrDescription: {
    type: String,
    default: "",
  },
  productType: {
    type: String,
    enum: ["גידולי שדה", "פרי", "ירק", "ללא"],
  },
  marketingDate: {
    type: Date,
    default: () => {
      const DAYS = 7,
        HOURS = 24,
        MINUTES = 60,
        SECONDS = 60,
        MILLISECONDS = 1000;
      let oneWeekInMilliseconds =
        DAYS * HOURS * MINUTES * SECONDS * MILLISECONDS;
      let dateOneWeekAgo = new Date(Date.now() - oneWeekInMilliseconds);
      return dateOneWeekAgo;
    },
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
