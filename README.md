# zl_thc
## To install
```javascript
npm install
```

## To run
```javascript
npm start
```
## To interact

### api/routes/clean (DELETE)
This clears out the "Inventory" database

### api/routes/init (PUT)
This sets up an initial inventory with all stock levels set to zero

Body: Array of objects
Example:
```
[
    {
        "mass_g": 700,
        "product_name": "RBC A+ Adult",
        "product_id": 0,
        "stock": 0,
    }
]
```

### api/routes/restock (PATCH)
This updates the stock of each item

Body: Array of objects
Example:
```
[
    {
        "product_id": 0,
        "quantity": 0,
    }
]
```
### api/order (PATCH)
This checks whether all the items are in stock. If they are, it creates shipments using as many drones as needed to accomodate the weight.

Shipment information is visible in the console and is returned in the body of the result (if using Postman or a similar solution to hit the endpoints)

Body: Array of objects
Example:
```
[
    {
        "product_id": 0,
        "quantity": 0,
    }
]
```



