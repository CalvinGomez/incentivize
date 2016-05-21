var express = require('express');
var router = express.Router();
var models = require("../models");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/courses', function(req, res, next) {
  	models.user.find({}, function(err, data){
        if (!err) {
            // res.send(data);
            console.log(data);
        } 
        else { 
        	console.log(err);
        }
    });
});

module.exports = router;
