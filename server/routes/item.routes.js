const itemController = require("../controllers/item.controller");


module.exports = (app) => {
  app.post("/api/item", itemController.createItem);
  app.get("/api/item", itemController.getAllItems);
  app.get("/api/item/:id", itemController.getOneItem);
  app.put("/api/item/:id", itemController.updateItem);
  app.delete("/api/item/:id", itemController.deleteItem);
};
