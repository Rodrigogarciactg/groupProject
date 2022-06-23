
const Item = require("../models/item.model");

const createItem = (req, res) => {
  Item.create(req.body)
    .then((newItem) => {
      res.json({ newItem });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const getAllItems = (req, res) => {
  Item.find()
    .then((allItems) => {
      res.json(allItems);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const getOneItem = (req, res) => {
  Item.findOne({ _id: req.params.id })
    .then((queriedItem) => {
      res.json(queriedItem);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const deleteItem = (req, res) => {
  Item.deleteOne({ _id: req.params.id })
    .then((deletedResponse) => {
      res.json({ deletedResponse });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
}; 

const updateItem = (req, res) => {
  Item.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedItem) => {
      res.json({ updatedItem });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};



module.exports = {
  createItem,
  getOneItem,
  getAllItems,
  updateItem,
  deleteItem,
};