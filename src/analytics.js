// Express stuffs what we need
const MongoClient = require('mongodb').MongoClient;

var app     = new (require('express'))();
var webtask = require('webtask-tools');
var bodyParser = require('body-parser');

// Without this, we can't get our POST data
app.use(bodyParser.urlencoded({ extended: true }));

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