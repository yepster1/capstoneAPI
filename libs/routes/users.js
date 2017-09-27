var express = require('express');
var router = express.Router();

var libs = process.cwd() + '/libs/';
var log = require(libs + 'log')(module);


var db = require(libs + 'db/mongoose');

var User = require(libs + 'model/user');

router.put('/changeRating', function (req, res){
    var userId = req.params.id;

    User.findById(userId, function (err, user) {
        if(!user) {
            res.statusCode = 404;
            log.error('user with id: %s Not Found', gameId);
            return res.json({ 
                error: 'Not found' 
            });
        }

        user.rating = req.params.rating;
        
        game.save(function (err) {
            if (!err) {
                log.info("user rating with id: %s updated", game.id);
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
                    
                    return res.json({ 
                        status: 'DUPLICATE KEY ERROR'
                    });
                }
                log.error('Internal error (%d): %s', res.statusCode, err.message);
            }
        });
    });
});

router.post('/', function(req, res) {
    console.log(req.query);
    var user = new User({
        username: req.query.username,
        hashedPassword: req.query.hashedPassword,
        salt: req.query.salt
    });

    user.save(function (err) {
        if (!err) {
            log.info("New user created with id: %s", user.id);
            return res.json({ 
                status: 'OK', 
                user:user 
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


router.get('/login', function(req, res){
    console.log(req.query);
    User.find({username: req.query.username,hashedPassword: req.query.password} ,function(err,users){
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

router.get('/',
    function(req, res) {
        console.log("info");
        // req.authInfo is set using the `info` argument supplied by
        // `BearerStrategy`.  It is typically used to indicate scope of the token,
        // and used in access control checks.  For illustrative purposes, this
        // example simply returns the scope in the response.
        User.find(function (err, users) {
            if (!err) {
                return res.json(users);
            } else {
                res.statusCode = 500;
                
                log.error('Internal error(%d): %s',res.statusCode,err.message);
                
                return res.json({ 
                    error: 'Server error' 
                });
            }
        });
    }
);

router.delete('/', function(req, res) {

    User.find({}, function(err) {
        if (!err) {
            return res.send('all users deleted!');
        } else {
            return res.send('Error deleting user!');
        }
    }).remove().exec();

});

router.delete(':user_id', function(req, res) {
    User.find({ id: req.query.user_id }, function(err) {
        if (!err) {
            return res.send('User deleted!');
        } else {
            return res.send('Error deleting user!');
        }
    }).remove().exec();

});

module.exports = router;