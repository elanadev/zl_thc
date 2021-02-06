const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost/zipline';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const { connection } = mongoose;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
  console.log(`MongoDB database connection established successfully at ${connectionString}`);
});

module.exports = connection;