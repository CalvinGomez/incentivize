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

// add/update transit log for specific user
router.get('/insertTransit', function(req, res, next) {
	var username = req.param('username');
	var activityType = req.param('activityType');
	var lat = req.param('latitude');
	var long = req.param('longitude');
	var update = req.param('update');
	var time = Date.now();
	if (update=='false') {
		var transit = new models.transit({
			"username": username,
		    "activityType": activityType,
		    "startTime": Date(time),
		    "startLat": Number(lat),
		    "startLong": Number(long),
		    "endTime": null,
		    "endLat": null,
		    "endLong": null,
		    "credit": 0
		});		

		transit.save(function(err, newUser) {
	        if (err) {
	        	// res.send({'status': 'Not OK'})
	        	throw err;
	        }
	        // else {
	        // 	res.send({'status': 'OK'})        	
	        // }
	    });
		res.send(transit);
	}
	else {
		models.transit.find({'username': username}, function(err, transitData){
	        if (!err) {
	        	models.transit.findById(transitData[transitData.length-1]._id, function(err, singleTransitData){
			        if (!err) {
			        	singleTransitData.endTime = Date.now();
			        	singleTransitData.endLat = Number(lat);
			        	singleTransitData.endLong = Number(long);
			        	var dist = calcDistance(singleTransitData.startLat, singleTransitData.startLong, lat, long);
			        	console.log("Distance: "+dist);
			        	if (singleTransitData.activityType == "walk") {
				        	singleTransitData.credit = singleTransitData.credit*5;
			        	}
			        	else {	
				        	singleTransitData.credit = singleTransitData.credit*2.5;
			        	}
			        	singleTransitData.activityType = activityType;	

						singleTransitData.save(function(err, newUser) {
					        if (err) {
					        	// res.send({'status': 'Not OK'})
					        	throw err;
					        }
					        // else {
					        // 	res.send({'status': 'OK'})        	
					        // }
					    });
			       		res.send(singleTransitData);  	
			        } 
			        else { 
			        	console.log(err);
			        }
    			});      	
	        } 
	        else { 
	        	console.log(err);
	        }
    	});
	} 
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

function calcDistance(beginLat,beginLong,endLat,endLong) {
   "use strict";
   let R = 6371;
   var latDiff = endLat - beginLat;
   latDiff = this.convertRadians(latDiff);
   var longDiff = endLong - beginLong;
   longDiff = this.convertRadians(longDiff);
   var a = Math.sin(latDiff/2) * Math.sin(latDiff/2) + Math.cos(this.convertRadians(beginLat)) * Math.cos(this.convertRadians(endLat)) * Math.sin(longDiff/2) * Math.sin(longDiff/2);
   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
   var d = R * c;
   return d;
 }
 
function convertRadians(coord) {
   return coord * Math.PI / 180;
 }

module.exports = router;
