const UserController = require('../controllers/user.controller');
const itemController = require("../controllers/item.controller");
module.exports = (app) => {
  // app.get("/api", itemController.index);
  app.post("/api/item", itemController.createItem);
  app.get("/api/item", itemController.getAllItems);
  app.get("/api/item/:id", itemController.getOneItem);
  //Added new route for items
  app.get("/api/itembyuser/:username", itemController.getItemsByUser);
  app.put("/api/item/:id", itemController.updateItem);
  app.delete("/api/item/:id", itemController.deleteItem);

  //User routes
  app.post("/register", UserController.register);
  app.post("/login", UserController.login);
  app.post("/logout", UserController.logout);
  app.get("/user", UserController.getLoggedInUser);
};
