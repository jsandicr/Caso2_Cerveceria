const mongoose = require("mongoose");

/**
 * Esta es la definición de la estructura
 */
const SubcategorySchema = mongoose.Schema(
  {
    idcategory: String,
    name: String,
    aroma: String,
    appearance: String,
    flavor: String,
    mouthfeel: String, 
    impression: String,
    comments: String,
    history: String,
    ingredients: String,
    comparison: String,
    examples: String,
    tags: String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Subcategory", SubcategorySchema);
