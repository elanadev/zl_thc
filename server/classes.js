class Shipment {
  constructor(orderId, shipmentId) {
    this.maxWeight = 1800
    this.weight = 0
    this.items = []
    this.orderId = orderId
    this.shipmentId = shipmentId
  }

  addItem(newItem) {
    if (this.weight + newItem.weight > 1800) {
      console.error('This drone is full')
    } else {
      console.log({ newItem })
      this.items.push(newItem)
      this.weight += newItem.weight
    }
  }

  getWeight() {
    console.log('running weight: ', this.weight)
    return this.weight
  }
}

class Shipments {
  constructor() {
    this.shipments = []
  }

  listShipments() {
    console.log(this.shipments)
    return (this.shipments)
  }

  countShipments() {
    return this.shipments.length || 0
  }

  newShipment(orderId) {
    let shipmentId = this.countShipments() + 1
    let shipment = new Shipment(orderId, shipmentId)
    this.shipments.push(shipment)
  }
}

module.exports = { Shipments, Shipment }