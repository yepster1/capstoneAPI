var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Game = new Schema({
	user1: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	user2: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	modified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('game', Game);