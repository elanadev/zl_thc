const express = require('express')
const bodyParser = require('body-parser');
const db = require('../database/database.js')
const routes = require('./routes.js');
const { get } = require('../database/database.js');

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(bodyParser.json());
app.use('/api/routes', routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})