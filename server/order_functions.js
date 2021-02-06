const schema = require('../database/schema.js');
const { calculateTotalWeight } = require('./utils')
const { Shipments, Shipment } = require('./classes.js')
const maxWeightPerDrone = 1800

const process_order = async (order, res) => {
  const { order_id, requested } = order

  const queryFilter = requested.map(item => {
    return { product_id: item.product_id }
  })


  const queryFields = ['stock', 'mass_g']

  const inventory = await schema.Inventory.find({ $or: queryFilter }, queryFields)

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
        let runningWeight = shipments.shipments[i].getWeight()
        if (runningWeight + expandedRequest[itemCount].weight < 1800) {
          shipments.shipments[i].addItem(expandedRequest[itemCount])
          //update stock in Inventory
          let product_id = expandedRequest[itemCount].product_id
          conditions = { product_id }
          update = { $inc: { stock: -1 } }
          options = { new: true }
          const decrement = await schema.Inventory.updateOne(conditions, update, options)
          console.log(decrement)


          expandedRequest.pop()
          console.log({ expandedRequest })
          itemCount--
        } else {
          break
        }
      }
    }


  }






  //"ship"

  //add order to Order and indicate status

  //if all not in stock
  // create shipment(s) for in stock items

  //update stock in Inventory

  //"ship"

  //add order to Order and indicate status

  //add entry to Backlog to keep track
}

module.exports = { process_order }
