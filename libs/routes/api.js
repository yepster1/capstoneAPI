var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    res.json({
    	msg: 'API is running again'
    });
});

module.exports = router;
