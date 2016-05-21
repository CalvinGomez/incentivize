var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	"username": String,
    "device_id": String

}, {
	collection: "users"
});

var activitySchema = new mongoose.Schema({
    "activityType": String
}, {
    collection: "activities"
});


var transitSchema = new mongoose.Schema({
	"username": String,
    "activityType": String,
    "startTime": Date,
    "startLat": Number,
    "startLong": Number,
    "endTime": Date,
    "endLat": Number,
    "endLong": Number,
    "credit": Number

}, {
	collection: "transits"
});

exports.user = mongoose.model('users',userSchema);
exports.activity=mongoose.model('activities', activitySchema);
exports.transit = mongoose.model('transits',transitSchema);