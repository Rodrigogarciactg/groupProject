const mongoose = require("mongoose");

const ItemsSchema = {
  item: {
    type: String,
    required: [true, "name is required"],
    minLength: [3, "Name must be at least 3 characters"],
  },
  price: {
    type: String,
    required: [true, "type is required"],
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    //Changed the seller to the reference to a User
    ref: "User",
  },
};

module.exports = mongoose.model("Item", ItemsSchema);
