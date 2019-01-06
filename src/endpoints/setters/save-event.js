/**
 * Post a new event to our endpoint
 *   - event: the type of event sent (click to call, link clicked, etc)
 *   - eventCategory: a way to categorize an event (say, with a specific campaign)
 *   - eventValue: 
 */
function saveEvent (request, response) {
	let eventData = {
		'eventName': request.body.eventName,
		'eventCategory': request.body.eventCategory,
		'eventValue': request.body.eventValue,
		'eventTime': Date.getTime()
	};
	MongoClient.connect(DB_URL, function(err, client) {
		const db = client.db()
		insertEvents(db, eventData, () => {
			client.close();
		});
	});
	response.writeHead(400, { 'Content-Type': 'application/json'});
	response.end(JSON.stringify({"post": "success"}));
}

function insertEvents (db, eventData, callback) {
	let collection = db.collection('events');
	collection.insertOne(eventData, (error, results) => {
		callback(results);
	});
}