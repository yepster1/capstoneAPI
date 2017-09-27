var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = process.cwd() + '/libs/';
var log = require(libs + 'log')(module);

var db = require(libs + 'db/mongoose');
var Game = require(libs + 'model/game');

router.get('/',function(req, res) {
	
	Game.find(function (err, games) {
		if (!err) {
			return res.json(games);
		} else {
			res.statusCode = 500;
			
			log.error('Internal error(%d): %s',res.statusCode,err.message);
			
			return res.json({ 
				error: 'Server error' 
			});
		}
	});
});

router.get('/myGames', function(req, res){
    console.log(req.query);
    Game.find({user: req.query.username} ,function(err,users){
        if (!err) {
            return res.json(users);
        } else {
            res.statusCode = 500;
            
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            
            return res.json({ 
                error: 'Server error' 
            });
        }
    })
});

router.post('/', function(req, res) {
	
	var game = new Game({
		user: req.query.user,
		myTeamAverageRating: req.query.myTeamAverageRating,
		otherAverageRating: req.query.otherAverageRating
	});
	
	game.save(function (err) {
		if (!err) {
			log.info("New game created with id: %s", game.id);
			return res.json({ 
				status: 'OK', 
				game:game 
			});
		} else {
			if(err.name === 'ValidationError') {
				res.statusCode = 400;
				res.json({ 
					error: 'Validation error' 
				});
			} else {
				res.statusCode = 500;
				
				log.error('Internal error(%d): %s', res.statusCode, err.message);
				
				res.json({ 
					error: 'Server error' 
				});
			}
		}
	});
});

router.get('/:id', function(req, res) {
	
	Game.findById(req.params.id, function (err, game) {
		
		if(!game) {
			res.statusCode = 404;
			
			return res.json({ 
				error: 'Not found' 
			});
		}
		
		if (!err) {
			return res.json({ 
				status: 'OK', 
				game:game 
			});
		} else {
			res.statusCode = 500;
			log.error('Internal error(%d): %s',res.statusCode,err.message);
			
			return res.json({ 
				error: 'Server error' 
			});
		}
	});
});

router.put('/:id', function (req, res){
	var gameId = req.params.id;

	game.findById(gameId, function (err, game) {
		if(!game) {
			res.statusCode = 404;
			log.error('game with id: %s Not Found', gameId);
			return res.json({ 
				error: 'Not found' 
			});
		}

		game.date = req.body.date;
		game.user1 = req.body.user1;
		game.user2 = req.body.user2;
		
		game.save(function (err) {
			if (!err) {
				log.info("game with id: %s updated", game.id);
				return res.json({ 
					status: 'OK', 
					game:game 
				});
			} else {
				if(err.name === 'ValidationError') {
					res.statusCode = 400;
					return res.json({ 
						error: 'Validation error' 
					});
				} else {
					res.statusCode = 500;
					
					return res.json({ 
						error: 'Server error' 
					});
				}
				log.error('Internal error (%d): %s', res.statusCode, err.message);
			}
		});
	});
});

module.exports = router;
