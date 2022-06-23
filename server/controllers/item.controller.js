
const Item = require(`../models/item.model`);

module.exports = {

  createItem: (req, res) => {
    Item.create(req.body)
      .then((newItem) => {
        console.log(newItem);
        res.json(newItem);
      })
      .catch((err) => {
        console.log('Something went wrong in createItem');
        res.status(400).json(err);
      })
  }, 

  getAllItems: (req, res) => {
    Item.find()
      .then((allItems) => {
        console.log(allItems);
        res.json(allItems);
      })
      .catch((err) => {
        console.log('Something went wrong in getAllItems');
        res.json({message: 'Something went wrong in getAllItems', error: err});
      })

  },

  getOneItem: (req, res) => {
    Item.findOne({_id: req.params.id})
      .then((oneItem) => {
        console.log(oneItem);
        res.json(oneItem);
      })
      .catch((err) => {
        console.log('Something went wrong in getOneItem.');
        res.json({message: 'Something went wrong in getOneItem', error: err});
      })
  },

  deleteItem: (req, res) => {
    Item.deleteOne({_id: req.params.id})
      .then((deleteItem) => {
        console.log(deleteItem);
        res.json(deletePet);
      })
      .catch((err) => {
        console.log('Something went wrong with deleteItem.');
        res.json({message: 'Something went wrong with deleteItem', error: err});
      })

  }, 

  updateItem: (req, res) => {
    Item.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
      .then((updateItem) => {
        console.log(updateItem);
        res.json(updateItem);
      })
      .catch((err) => {
        console.log('Something went wrong in updateItem');
        res.status(400).json(err);
      })

  }

}

// Test

module.exports.index = (req, res) => {
  res.json({
    message: 'Hello World'
  })
}