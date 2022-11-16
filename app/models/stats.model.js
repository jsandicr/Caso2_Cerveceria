const mongoose = require("mongoose");

/**
 * Esta es la definición de la estructura
 */
const StatsSchema = mongoose.Schema(
  {
    idsubcategory: String,
    ibu: {
      low: Number,
      high: Number
    },
    og: {
      low: Number,
      high: Number
    },
    fg: {
      low: Number,
      high: Number
    },
    srm: {
      low: Number,
      high: Number
    },
    abv: {
      low: Number,
      high: Number
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Stats", StatsSchema);