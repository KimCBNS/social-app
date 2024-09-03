const { connect, connection } = require('mongoose');

// my mongoDB database is named socialNetworkDB
connect('mongodb://127.0.0.1:27017/socialNetworkDB');

module.exports = connection;
