//Referencia al modelo
const Subcategory = require("../models/subcategory.model.js");

/**
 * Para crear un nuevo registro
 * @param {*} req Solicitud desde Web
 * @param {*} res Respuesta de la sub categoria creado
 * @returns JSON
 */

/*
{
  "idcategory": "6374427aea1bc5a38cce9a2e",
  "name": "American Lager",
  "aroma": "Low to no malt aroma, although it can be perceived as grainy, sweet or corn-like if present. Hop aroma may range from none to a light, spicy or floral hop presence. While a clean fermentation character is desirable, a light amount of yeast character (particularly a light apple character) is not a fault. Light DMS is also not a fault.",
  "appearance": "Very pale straw to medium yellow color. White, frothy head seldom persists. Very clear.",
  "flavor": "Relatively neutral palate with a crisp and dry finish and a moderately-low to low grainy or corn-like flavor that might be perceived as sweetness due to the low bitterness. Hop flavor ranges from none to moderately-low levels, and can have a floral, spicy, or herbal quality (although often not strong enough to distinguish). Hop bitterness at low to medium-low level. Balance may vary from slightly malty to slightly bitter, but is relatively close to even. High levels of carbonation may accentuate the crispness of the dry finish. Clean lager fermentation character.",
  "mouthfeel": "Low to medium-low body. Very highly carbonated with slight carbonic bite on the tongue.",
  "impression": "A very pale, highly-carbonated, light-bodied, well-attenuated lager with a very neutral flavor profile and low bitterness. Served very cold, it can be a very refreshing and thirst quenching drink.",
  "comments": "Strong flavors are a fault. Often what non-craft beer drinkers expect to be served if they order beer in the United States. May be marketed as Pilsner beers outside of Europe, but should not be confused with traditional examples.",
  "history": "Although German immigrants had brewed traditional Pilsner-inspired lager beer in the United States since the mid-late 1800s, the modern American lager style was heavily influenced by Prohibition and World War II. Surviving breweries consolidated, expanded distribution, and heavily promoted a beer style that was appealing to a broad range of the population. Became the dominant beer style for many decades, and spawning many international rivals who would develop similarly bland products for the mass market supported by heavy advertising.",
  "ingredients": "Two- or six-row barley with high percentage (up to 40%) of rice or corn as adjuncts.",
  "comparison": "Stronger, more flavor and body than a Light American Lager. Less bitterness and flavor than an International Lager. Significantly less flavor, hops, and bitterness than traditional European Pilsners.",
  "examples": "Budweiser, Coors Original, Grain Belt Premium Lager, Miller High Life, Pabst Blue Ribbon, Special Export",
  "tags": "standard-strength, pale-color, bottom-fermented, lagered, north-america, traditional-style, pale-lager-family, balanced"
}
*/

exports.create = (req, res) => {
  //Se valida
  if (!req.body.idcategory) {
    return res.status(400).send({
      message: "El id de categoria no puede ser vac??o",
    });
  }

  if (!req.body.name) {
    return res.status(400).send({
      message: "El nombre no puede ser vac??o",
    });
  }
  if (!req.body.aroma) {
    return res.status(400).send({
      message: "La aroma no puede ser vac??a",
    });
  }
  if (!req.body.appearance) {
    return res.status(400).send({
      message: "La apariencia no puede ser vac??a",
    });
  }
  if (!req.body.flavor) {
    return res.status(400).send({
      message: "El sabor no puede ser vac??a",
    });
  }
  if (!req.body.mouthfeel) {
    return res.status(400).send({
      message: "La sensacion no puede ser vac??a",
    });
  }
  if (!req.body.impression) {
    return res.status(400).send({
      message: "La impresion no puede ser vac??a",
    });
  }
  if (!req.body.comments) {
    return res.status(400).send({
      message: "Los comentarios no pueden ser vac??os",
    });
  }
  if (!req.body.history) {
    return res.status(400).send({
      message: "La historia no puede ser vac??a",
    });
  }
  if (!req.body.ingredients) {
    return res.status(400).send({
      message: "Los ingredientes no pueden ser vac??os",
    });
  }
  if (!req.body.comparison) {
    return res.status(400).send({
      message: "La comparasion no puede ser vac??a",
    });
  }
  if (!req.body.examples) {
    return res.status(400).send({
      message: "Los ejemplos no pueden ser vac??os",
    });
  }
  if (!req.body.tags) {
    return res.status(400).send({
      message: "Los tags no pueden ser vac??os",
    });
  }

  const subcategory = new Subcategory({
    idcategory: req.body.idcategory,
    name: req.body.name,
    aroma: req.body.aroma,
    appearance: req.body.appearance,
    flavor: req.body.flavor,
    mouthfeel: req.body.mouthfeel, 
    impression: req.body.impression,
    comments: req.body.comments,
    history: req.body.history,
    ingredients: req.body.ingredients,
    comparison: req.body.comparison,
    examples: req.body.examples,
    tags: req.body.tags
  });

  subcategory
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error registrando la sub categoria.",
      });
    });
}

/**
 * Se obtienen todos los registros
 * @param {*} req Solicitud web
 * @param {*} res Respuesta de registros en JSON
 */
exports.findAll = (req, res) => {
  Subcategory.find()
    .then((subcategories) => {
      res.send(subcategories);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error al obtener las ordenes.",
      });
    });
};

exports.findOne = (req, res) => {
  Subcategory.findById(req.params._id)
    .then((subcategories) => {
      if (!subcategories) {
        return res.status(404).send({
          message: "No hay sub categorias con el ID " + req.params._id,
        });
      }
      res.send(subcategories); //Este si existe
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "No hay sub categorias con el ID " + req.params._id,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al obtener la sub categoria " +
          req.params._id,
      });
    });
};

exports.update = (req, res) => {
  // Valida
  if (!req.body.name) {
    return res.status(400).send({
      message: "El nombre de sub categoria no puede ser vac??o",
    });
  }

  //Encontrar la sub categoria
  Subcategory.findByIdAndUpdate(
    req.params._id,
    {
      idcategory: req.body.idcategory,
      name: req.body.name,
      aroma: req.body.aroma,
      appearance: req.body.appearance,
      flavor: req.body.flavor,
      mouthfeel: req.body.mouthfeel, 
      impression: req.body.impression,
      comments: req.body.comments,
      history: req.body.history,
      ingredients: req.body.ingredients,
      comparison: req.body.comparison,
      examples: req.body.examples,
      tags: req.body.tags
    },
    { new: true }
  )
    .then((subcategories) => {
      if (!subcategories) {
        return res.status(404).send({
          message: "No hay sub categorias con el id " + req.params._id,
        });
      }
      res.send(subcategories);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "No hay sub categorias con el id " + req.params._id,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al actualizar la sub categoria " +
          req.params._id,
      });
    });
};

/**
 * Eliminar una sub categoria
 * @param {*} req Solicitud web
 * @param {*} res Respuesta del sub categoria eliminado
 */
 exports.delete = (req, res) => {
  Subcategory.findByIdAndRemove(req.params._id)
    .then((subcategories) => {
      if (!subcategories) {
        return res.status(404).send({
          message: "No hay sub categorias con el id " + req.params._id,
        });
      }
      res.send({ message: "La sub categoria se elimin?? de manera correcta!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "No hay sub categorias con el id " + req.params._id,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al eliminar la categoria " +
          req.params._id,
      });
    });
};