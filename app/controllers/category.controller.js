//Referencia al modelo
const Category = require("../models/category.model.js");

/**
 * Para crear un nuevo registro
 * @param {*} req Solicitud desde Web
 * @param {*} res Respuesta del categoria creado
 * @returns JSON
 */

/*
Ejemplo json
{
    "revision": "2015",
    "name": "Standard American Beer",
    "notes": "This category describes everyday American beers that have a wide public appeal. Containing both ales and lagers, the beers of this category are not typically complex, and have smooth, accessible flavors. The ales tend to have lager-like qualities, or are designed to appeal to mass-market lager drinkers as crossover beers. Mass-market beers with a more international appeal or origin are described in the International Lager category."
}
*/

exports.create = (req, res) => {
  //Se valida
  if (!req.body.name) {
    return res.status(400).send({
      message: "El nombre de categoria no puede ser vacío",
    });
  }

  //Se forma
  const category = new Category({
    revision: req.body.revision,
    name: req.body.name,
    notes: req.body.notes
  });

  //Se guarda
  category
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Opss. Tuvimos un error registrando la categoria.",
      });
    });
};

exports.findAll = (req, res) => {
  Category.find()
    .then((categories) => {
      res.send(categories);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error al obtener las categorias.",
      });
    });
};

exports.findOne = (req, res) => {
  Category.findById(req.params._id)
    .then((category) => {
      if (!category) {
        return res.status(404).send({
          message: "No hay categorias con el ID " + req.params._id,
        });
      }
      res.send(category); //Este si existe
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "No hay categorias con el ID " + req.params._id,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al obtener la categoria " +
          req.params._id,
      });
    });
};

exports.update = (req, res) => {
  // Valida
  if (!req.body.name) {
    return res.status(400).send({
      message: "El nombre de categoria no puede ser vacío",
    });
  }

  //Encontrar el categoria
  Category.findByIdAndUpdate(
    req.params._id,
    {
      revision: req.body.revision,
      name: req.body.name,
      notes: req.body.notes,
    },
    { new: true }
  )
    .then((category) => {
      if (!category) {
        return res.status(404).send({
          message: "No hay categorias con el id " + req.params._id,
        });
      }
      res.send(category);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "No hay categorias con el id " + req.params._id,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al actualizar la categoria " +
          req.params._id,
      });
    });
};

/**
 * Eliminar un categoria
 * @param {*} req Solicitud web
 * @param {*} res Respuesta del categoria eliminado
 */
 exports.delete = (req, res) => {
  Category.findByIdAndRemove(req.params._id)
    .then((category) => {
      if (!category) {
        return res.status(404).send({
          message: "No hay categorias con el id" + req.params._id,
        });
      }
      res.send({ message: "La categoria se eliminó de manera correcta!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "No hay categorias con el id" + req.params._id,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al eliminar la categoria " +
          req.params._id,
      });
    });
};