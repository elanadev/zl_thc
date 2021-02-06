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

### api/routes/init (PUT)
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
```
[
    {
        "product_id": 0,
        "quantity": 0,
    }
]
```



