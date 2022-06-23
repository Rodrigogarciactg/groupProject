const ItemController = require("../controllers/item.controller");
module.exports = (app) => {
  app.get('/', ItemController.getAllItems);
  app.post('/item/create', ItemController.createItem);
  app.get('/view/:id', ItemController.getOneItem);
  app.put('/item/:id', ItemController.updateItem);
  app.delete('/item/:id', ItemController.deleteItem);
  
};
