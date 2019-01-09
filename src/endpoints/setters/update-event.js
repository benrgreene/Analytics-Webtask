/**
 * Update an event of a given name
 */
function updateEvent (request, response) {
	// basis for what to update
	let eventQuery = {
		'eventName': request.body.eventName
	};
	// what we should update
	let eventData = {
		$set: {
			'eventName': request.body.eventName,
			'eventValue': request.body.eventValue,
			'eventCategory': request.body.eventCategory,
			'eventTime': (new Date()).getTime()
		}
	};
	MongoClient.connect(DB_URL, function(err, client) {
		const db = client.db()
		updateEventInDB(db, eventQuery, eventData);
		client.close();
		response.writeHead(200, { 'Content-Type': 'application/json'});
		response.end(JSON.stringify({"post": "success"}));
	});
	// Issue with connecting to the DB
	response.writeHead(500, { 'Content-Type': 'application/json'});
	response.end(JSON.stringify({"post": "success"}));
}

function updateEventInDB (db, eventQuery, eventData) {
	let collection = db.collection('events');
	collection.updateOne(eventQuery, eventData, {'upsert': true});
}