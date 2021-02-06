const calculateTotalWeight = (requestList, currentInventory) => {
  let totalWeight = 0
  requestList.forEach((item, idx) => {
    const quantity = item.quantity
    const weight = currentInventory[idx].mass_g
    const add = quantity * weight
    totalWeight += add
    console.log({ quantity, weight, add, totalWeight })
  })
  return totalWeight
}





module.exports = { calculateTotalWeight }