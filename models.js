var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	"username": String,
    "email": String,
    "password": String,
    "device_id": String

}, {
	collection: "users"
});

var acitivitySchema = new mongoose.Schema({
    "activityType": String
}, {
    collection: "activities"
});


var transitSchema = new mongoose.Schema({
	"username": String,
    "activity_id": String,
    "startTime": Date,
    "startLat": Number,
    "startLong": Number,
    "endTime": Date,
    "endLat": Number,
    "endLong": Number

}, {
	collection: "transits"
});


var creditSchema = new mongoose.Schema({
    "transit_id": String,
    "credit": Number

}, {
	collection: "credits"
});

exports.User = mongoose.model('users',userSchema);
exports.theNews=mongoose.model('activities', activitySchema);
exports.Course = mongoose.model('transits',transitSchema);
exports.OverallRating = mongoose.model('credits',creditSchema);