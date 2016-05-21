var express = require('express');
var router = express.Router();
var models = require("../models");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// return all user data
router.get('/users', function(req, res, next) {
	var username = req.param('username');
  	models.user.find({'username': username}, function(err, data){
        if (!err) {
            res.send(data);
            console.log(data);
        } 
        else { 
        	console.log(err);
        }
    });
});

// add transit log for specific user
router.get('/insertTransit', function(req, res, next) {
	var username = req.param('username');
	var activityType = req.param('activityType');
	// var startTime = req.param('startTime');
	var startTime = Date.now();
	var startLat = req.param('startLat');
	var startLong = req.param('startLong');
	// var endTime = req.param('endTime');
	var endTime = Date.now();
	var endLat = req.param('endLat');
	var endLong = req.param('endLong');
	var credits = req.param('credits');

	var transit = new models.transit({
		"username": username,
	    "activityType": activityType,
	    "startTime": Date(startTime),
	    "startLat": Number(startLat),
	    "startLong": Number(startLong),
	    "endTime": Date(endTime),
	    "endLat": Number(endLat),
	    "endLong": Number(endLong),
	    "credit": Number(credits)
	});

	transit.save(function(err, newUser) {
        if (err) {
        	res.send({'status': 'Not OK'})
        	throw err;
        }
        else {
        	res.send({'status': 'OK'})        	
        }
    });
 	// res.send(transit);
});

// return all transit logs for specific user
router.get('/retrieveTransit', function(req, res, next) {
 	var username = req.param('username');
  	models.transit.find({'username': username}, function(err, transitData){
        if (!err) {
        	res.send(transitData);       	
        } 
        else { 
        	console.log(err);
        }
    });
});

// return all user data
router.get('/retrieveTotalCredits', function(req, res, next) {
	var username = req.param('username');
  	models.transit.find({'username': username}, function(err, data){
		var total = 0;
        if (!err) {
        	for (var i = 0; i < data.length; i++) {
        		total = total + data[i].credit;
        	}
        	var creditSum = {
        		'credits':total
        	}
            res.send(creditSum);
        } 
        else { 
        	console.log(err);
        }
    });
});

module.exports = router;
