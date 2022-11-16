const mongoose = require("mongoose");

/**
 * Esta es la definición de la estructura
 */
const CategorySchema = mongoose.Schema(
  {
    revision: String,
    name: String,
    notes: String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", CategorySchema);