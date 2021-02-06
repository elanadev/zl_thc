const mongoose = require('mongoose');
const { Shipments } = require('../server/classes.js')


const { Schema } = mongoose;

const inventorySchema = new Schema({
  mass_g: Number,
  product_name: String,
  product_id: Number,
  stock: Number,
})

const orderSchema = new Schema({
  order_id: Number,
  requested: [{ product_id: Number, quantity: Number }],
  outcome: {
    shipped: Array,
    notShipped: Array
  }
})

const backlogSchema = new Schema({
  order_id: Number,
  product_id: Number,
  waiting_to_ship: Number,
  resolved: Boolean,
})

const Inventory = mongoose.model('Inventory', inventorySchema);
const Orders = mongoose.model('Order', orderSchema);
const Backlog = mongoose.model('Backlog', backlogSchema);

module.exports = { Inventory, Orders, Backlog }