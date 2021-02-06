const schema = require('../database/schema.js');
const { calculateTotalWeight } = require('./utils')
const { Shipments, Shipment } = require('./classes.js')
const maxWeightPerDrone = 1800

const process_order = async (order, res) => {
  const { order_id, requested } = order

  const inventoryFilter = requested.map(item => {
    return { product_id: item.product_id }
  })

  const inventoryFields = ['stock', 'mass_g']

  const inventory = await schema.Inventory.find({ $or: inventoryFilter }, inventoryFields)

  //check if all items are in stock
  let isAllStocked = true

  requested.map((item, idx) => {
    if (item.quantity > inventory[idx].stock) {
      isAllStocked = false
    }
  })

  //if all in stock

  //create shipment(s)
  if (isAllStocked) {
    const totalWeight = calculateTotalWeight(requested, inventory)
    let expandedRequest = []

    for (let i = 0; i < requested.length; i++) {
      for (let j = 0; j < requested[i].quantity; j++) {
        expandedRequest.push({ product_id: requested[i].product_id, weight: inventory[i].mass_g })
      }
    }

    let minDrones = Math.ceil(totalWeight / maxWeightPerDrone)

    let shipments = new Shipments()
    let itemCount = expandedRequest.length - 1

    for (let i = 0; i < minDrones; i++) {
      shipments.newShipment(order_id)

      while (itemCount >= 0) {
        const runningWeight = shipments.shipments[i].getWeight()
        const newItem = expandedRequest[itemCount]

        if (runningWeight + newItem.weight < 1800) {
          shipments.shipments[i].addItem(newItem)
          //update stock in Inventory
          const product_id = newItem.product_id
          decrementConditions = { product_id }
          decrementUpdate = { $inc: { stock: -1 } }
          decrementOptions = { new: true }
          await schema.Inventory.updateOne(decrementConditions, decrementUpdate, decrementOptions)
          expandedRequest.pop()
          itemCount--
        } else {
          break
        }
      }
    }

    //add order to Order and indicate status
    const orderConditions = { order_id }
    const orderUpdate = {
      order_id, requested, outcome: { shipped: shipments }
    }
    const orderOptions = { upsert: true }

    schema.Orders.updateOne(orderConditions, orderUpdate, orderOptions)
      .then(() => res.status(200).send(orderUpdate))
      .catch((err) => res.status(400).send(`Error: ${err}`));

    //"ship"
    shipments.listShipments()
  }

  //TO-D0
  //if all not in stock
  // create shipment(s) for in stock items
  //update stock in Inventory
  //"ship"
  //add order to Order and indicate status
  //add entry to Backlog to keep track
}

module.exports = { process_order }
