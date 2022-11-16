//Referencia al modelo
const Stats = require("../models/stats.model.js");

/**
 * Para crear un nuevo registro
 * @param {*} req Solicitud desde Web
 * @param {*} res Respuesta del stat creado
 * @returns JSON
 */

/*
{
    "idsubcategory": "63743eaccbf09e5d60f79b58",
        "ibu": {
            "low": 8,
            "high": 18
        },
        "og": {
            "low": 1.04,
            "high": 1.05
        },
        "fg": {
            "low": 1.004,
            "high": 1.01
        },
        "srm": {
            "low": 2,
            "high": 4
        },
        "abv": {
            "low": 4.2,
            "high": 5.3
        }
}
*/
exports.create = (req, res) => {
  //Se valida
  if (!req.body.idsubcategory) {
    return res.status(400).send({
      message: "El id de sub categoria no puede ser vacío",
    });
  }

  //Se forma
  const stats = new Stats({
    idsubcategory: req.body.idsubcategory,
    ibu: {
      low: req.body.ibu.low,
      high: req.body.ibu.high
    },
    og: {
      low: req.body.og.low,
      high: req.body.og.high
    },
    fg: {
      low: req.body.fg.low,
      high: req.body.fg.high
    },
    srm: {
      low: req.body.srm.low,
      high: req.body.srm.high
    },
    abv: {
      low: req.body.abv.low,
      high: req.body.abv.high
    },
  });

  //Se guarda
  stats
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error registrando las estadisticas.",
      });
    });
};

/**
 * Se obtienen todos los registros
 * @param {*} req Solicitud web
 * @param {*} res Respuesta de registros en JSON
 */
exports.findAll = (req, res) => {
  Stats.find()
    .then((stats) => {
      res.send(stats);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error al obtener las estadisticas.",
      });
    });
};

/**
 * Se encuentra el stat por ID
 * @param {*} req Solicitud web
 * @param {*} res Respuesta del stat en JSON
 */
exports.findOne = (req, res) => {
  Stats.findById(req.params._id)
    .then((stats) => {
      if (!stats) {
        return res.status(404).send({
          message: "No hay estadisticas con el ID " + req.params._id,
        });
      }
      res.send(stats); //Este si existe
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "No hay estadisticas con el ID " + req.params._id,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al obtener las estadisticas " +
          req.params._id,
      });
    });
};

/**
 * Actualiza un registro
 * @param {*} req Solicitud web
 * @param {*} res Respuesta del registro actualizado
 * @returns JSON
 */
exports.update = (req, res) => {
  // Valida
  if (!req.body.idsubcategory) {
    return res.status(400).send({
      message: "El id de subcategoria no puede ser nulo",
    });
  }

  //Encontrar el stat
  Stats.findByIdAndUpdate(
    req.params._id,
    {
      idsubcategory: req.body.idsubcategory,
      ibu: {
        low: req.body.ibu.low,
        high: req.body.ibu.high
      },
      og: {
        low: req.body.og.low,
        high: req.body.og.high
      },
      fg: {
        low: req.body.fg.low,
        high: req.body.fg.high
      },
      srm: {
        low: req.body.srm.low,
        high: req.body.srm.high
      },
      abv: {
        low: req.body.abv.low,
        high: req.body.abv.high
      },
    },
    { new: true }
  )
    .then((stats) => {
      if (!stats) {
        return res.status(404).send({
          message: "No hay estadisticas con el id " + req.params._id,
        });
      }
      res.send(stats);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "No hay estadisticas con el id " + req.params._id,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al actualizar las estadisticas " +
          req.params._id,
      });
    });
};

/**
 * Eliminar un stat
 * @param {*} req Solicitud web
 * @param {*} res Respuesta del stat eliminado
 */
exports.delete = (req, res) => {
  Stats.findByIdAndRemove(req.params._id)
    .then((stats) => {
      if (!stats) {
        return res.status(404).send({
          message: "No hay estadisticas con el id" + req.params._id,
        });
      }
      res.send({ message: "Las estadisticas se eliminaron de manera correcta!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "No hay estadisticas con el id" + req.params._id,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al eliminar las estadisticas " +
          req.params._id,
      });
    });
};