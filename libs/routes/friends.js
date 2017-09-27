var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = process.cwd() + '/libs/';
var log = require(libs + 'log')(module);

var db = require(libs + 'db/mongoose');
var Friend = require(libs + 'model/friend');

router.get('/',function(req, res) {
    
    Friend.find(function (err, friends) {
        if (!err) {
            return res.json(friends);
        } else {
            res.statusCode = 500;
            
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            
            return res.json({ 
                error: 'Server error' 
            });
        }
    });
});

router.post('/', function(req, res) {
    
    var friend = new Friend({
        user1: req.query.user,
        user2: req.query.user2,
    });
    
    game.save(function (err) {
        if (!err) {
            log.info("New friend created with id: %s", game.id);
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
    
    Friend.findById(req.params.id, function (err, game) {
        
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

module.exports = router;