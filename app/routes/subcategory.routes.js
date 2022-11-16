module.exports = (app) => {
  const subcategory = require("../controllers/subcategory.controller.js");

  //Estas son las rutas para el API
  //Registrar
  app.post("/subcategory", subcategory.create);

  //Listar
  app.get("/subcategory", subcategory.findAll);

  //Obtener
  app.get("/subcategory/:_id", subcategory.findOne);

  //Actualizar
  app.put("/subcategory/:_id", subcategory.update);

  //Eliminar
  app.delete("/subcategory/:_id", subcategory.delete);
};