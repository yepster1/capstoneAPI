var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Game = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	myTeamAverageRating : {type: Number, unique: false, required: true},
	otherAverageRating : {type: Number, unique: false, required: true},
	modified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('game', Game);