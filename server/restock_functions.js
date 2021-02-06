const schema = require('../database/schema.js');

const process_restock = async (restock, res) => {
  try {
    const promises = restock.map(item => {
      const { product_id, quantity } = item

      conditions = { product_id }
      update = { stock: quantity }
      options = { new: true }

      //would preferably want to implement a rollback in case an update fails, but leaving it for now
      return schema.Inventory.updateOne(conditions, update, options)
    })
    await Promise.all(promises)
    res.status(200).send('Updated stock')
  } catch (err) {
    //Should be more robust error reporting here, but moving on in the interest of time
    res.status(400).send(`Error: ${err}`)
  }
}

module.exports = { process_restock }