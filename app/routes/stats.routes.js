module.exports = (app) => {
  const stats = require("../controllers/stats.controller.js");

  //Estas son las rutas para el API

  //Registrar
  app.post("/stats", stats.create);

  //Listar
  app.get("/stats", stats.findAll);

  //Obtener uno
  app.get("/stats/:_id", stats.findOne);

  //Actualizar
  app.put("/stats/:_id", stats.update);

  //Eliminar
  app.delete("/stats/:_id", stats.delete);
};
