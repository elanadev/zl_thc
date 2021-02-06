const router = require('express').Router();
const { clean_catalog, init_catalog } = require('./init_functions.js')
const { process_restock } = require('./restock_functions.js')
const { process_order, finalShipments } = require('./order_functions.js')
const { product_info } = require('./initial_products.js')

router.route('/clean/').delete((req, res) => {
  clean_catalog(req, res)
});

router.route('/init/').put((req, res) => {
  init_catalog(product_info, req, res)
});

router.route('/restock/').patch((req, res) => {
  process_restock(req.body, res)
  //with more time, I would want to extend this to check the Backlog to see if there are outstanding, unfilled orders that were waiting for a restock.
});

router.route('/order').patch((req, res) => {
  process_order(req.body, res)
});


router.route('/ship').get((req, res) => {
  res.status(200).send(finalShipments)
});


module.exports = router;