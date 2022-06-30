const mongoose = require("mongoose");

const ItemsSchema = {

  item: {
    type: String,
    required: [true, "Item name is required"],
    minLength: [3, "Item Name must be at least 3 characters"],
  },
  price: {
    type: String,
    required: [true, "Price is required"],
  },
  seller: {
    type: String,
    required: [true, "Seller name is required"],
    minLength: [2, "Seller name must be at least 3 characters"],
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }

};

const User = {



}

module.exports = mongoose.model("Item", ItemsSchema);
