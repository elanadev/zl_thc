const router = require('express').Router();
const schema = require('../database/schema.js');

const product_info = [
  { "mass_g": 700, "product_name": "RBC A+ Adult", "product_id": 0, stock: 0 },
  { "mass_g": 700, "product_name": "RBC B+ Adult", "product_id": 1, stock: 0 },
  { "mass_g": 750, "product_name": "RBC AB+ Adult", "product_id": 2, stock: 0 },
  { "mass_g": 680, "product_name": "RBC O- Adult", "product_id": 3, stock: 0 },
  { "mass_g": 350, "product_name": "RBC A+ Child", "product_id": 4, stock: 0 },
  { "mass_g": 200, "product_name": "RBC AB+ Child", "product_id": 5, stock: 0 },
  { "mass_g": 120, "product_name": "PLT AB+", "product_id": 6, stock: 0 },
  { "mass_g": 80, "product_name": "PLT O+", "product_id": 7, stock: 0 },
  { "mass_g": 40, "product_name": "CRYO A+", "product_id": 8, stock: 0 },
  { "mass_g": 80, "product_name": "CRYO AB+", "product_id": 9, stock: 0 },
  { "mass_g": 300, "product_name": "FFP A+", "product_id": 10, stock: 0 },
  { "mass_g": 300, "product_name": "FFP B+", "product_id": 11, stock: 0 },
  { "mass_g": 300, "product_name": "FFP AB+", "product_id": 12, stock: 0 }
]

const clean_catalog = (req, res) => {
  schema.Inventory.deleteMany()
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(`Error: ${err}`));
}

const init_catalog = (initialInventory, req, res) => {
  schema.Inventory.insertMany(initialInventory)
    .then((inventory) => res.status(200).send(inventory))
    .catch((err) => res.status(400).send(`Error: ${err}`));
}

const process_restock = async (restock, res) => {
  try {
    const promises = restock.map(item => {
      const { product_id, quantity } = item

      conditions = { product_id }
      update = { stock: quantity }
      options = { new: true }

      return schema.Inventory.updateOne(conditions, update, options)
    })
    await Promise.all(promises)
    res.status(200).send('Updated stock')
  } catch (err) {
    //Should be more robust error reporting here, but moving on in the interest of time
    res.status(400).send(`Error: ${err}`)
  }
}

const process_order = (order, res) => {
  const { order_id, requested } = order



  requested.forEach(item => {
    const { product_id, quantity } = item

    filter = { product_id }
    fields = 'stock'

    schema.Inventory.findOne(filter, fields)
      .then((response) => console.log(response))
      .catch((err) => res.status(400).send(`Error: ${err}`));
  })
}

router.route('/clean/').delete((req, res) => {
  clean_catalog(req, res)
});

router.route('/init/').put((req, res) => {
  init_catalog(product_info, req, res)
});

router.route('/restock/').patch((req, res) => {
  process_restock(req.body, res)
});

router.route('/order').patch((req, res) => {
  process_order(req.body, res)
});


module.exports = router;