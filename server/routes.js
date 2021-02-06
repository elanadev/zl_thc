const router = require('express').Router();
const { clean_catalog, init_catalog } = require('./init_functions.js')
const { process_restock } = require('./restock_functions.js')
const { process_order } = require('./order_functions.js')
const { product_info } = require('./initial_products.js')

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