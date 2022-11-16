module.exports = (app) => {
  const category = require("../controllers/category.controller.js");

  //Estas son las rutas para el API
  //Registrar
  app.post("/category", category.create);

  //Listar
  app.get("/category", category.findAll);

  //Obtener uno
  app.get("/category/:_id", category.findOne);

  //Actualizar
  app.put("/category/:_id", category.update);

  //Eliminar
  app.delete("/category/:_id", category.delete);
};