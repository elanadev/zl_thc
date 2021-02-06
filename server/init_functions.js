const schema = require('../database/schema.js');



const clean_catalog = (req, res) => {
  schema.Inventory.deleteMany()
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(`Error: ${err}`));
}

const init_catalog = (productList, req, res) => {

  schema.Inventory.insertMany(productList)
    .then((inventory) => res.status(200).send(inventory))
    .catch((err) => res.status(400).send(`Error: ${err}`));
}

module.exports = { clean_catalog, init_catalog }