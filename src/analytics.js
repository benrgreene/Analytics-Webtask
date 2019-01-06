// Express stuffs what we need
const MongoClient = require('mongodb').MongoClient;

var app     = new (require('express'))();
var webtask = require('webtask-tools');

// POST endpoints
app.post('/AddEvent', saveEvent);	
// GET endpoints
app.get('/Events', getEvents);
app.get('/AllEvents', getAllEvents);

/**
 * Export the endpoints as the module. 
 * (GET endpoints should be secured so only authenticated users can access the data)
 */
module.exports = webtask.fromExpress(app).auth0({
	exclude : [
		'/AddEvent'
	]
});