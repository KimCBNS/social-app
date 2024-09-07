const { connect, connection } = require('mongoose');

// my mongoDB database is named socialNetworkDB
connect('mongodb://127.0.0.1:27017/socialNetworkDB');

// module.exports = connection;

// Handle connection events
connection.on('connected', () => {
  console.log('Mongoose connected to socialNetworkDB');
});

connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Export the connection
module.exports = connection;