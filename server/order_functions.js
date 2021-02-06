const schema = require('../database/schema.js');

const process_order = async (order, res) => {
  const { order_id, requested } = order

  let currentStock = []

  try {
    currentStock = await requested.map(item => {
      const { product_id, quantity } = item

      filter = { product_id }
      fields = ['stock', 'mass_g']

      let report = {}

      schema.Inventory.findOne(filter, fields)
        .then((doc) => {
          let { stock, mass_g } = doc
          console.log('showing data: ', { stock, mass_g })
          report = { stock, mass_g }
          console.log('report inside findOne ', report)
        })

      console.log('report inside currentStock map ', report)
      return report
    })
    // .then((response) => console.log(response))
    // .catch((err) => res.status(400).send(`Error: ${err}`));

  } catch (err) {
    res.status(400).send(`Error: ${err}`)
  } finally {
    console.log('current stock in finally ', { currentStock }) //Why is this line printing before the stuff inside the try??
  }

}

module.exports = { process_order }