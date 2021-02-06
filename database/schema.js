const mongoose = require('mongoose');

const { Schema } = mongoose;

const inventorySchema = new Schema({
  mass_g: Number,
  product_name: String,
  product_id: Number,
  stock: Number,
})

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = { Inventory }