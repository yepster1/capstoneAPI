var mongoose = require('mongoose');

var libs = process.cwd() + '/libs/';

var log = require(libs + 'log')(module);
var config = require(libs + 'config');
var dbURI = "mongodb://127.0.0.1:27017/loc8r";

mongoose.connect(dbURI);

var db = mongoose.connection;

db.on('error', function (err) {
	log.error('Connection error:', err.message);
});

db.once('open', function callback () {
	log.info("Connected to DB!");
});

module.exports = mongoose;