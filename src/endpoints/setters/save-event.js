/**
 * Post a new event to our endpoint
 *   - event: the type of event sent (click to call, link clicked, etc)
 *   - eventCategory: a way to categorize an event (say, with a specific campaign)
 *   - eventValue: 
 */
function saveEvent (request, response) {
	let eventData = {
		'eventName': request.webtaskContext.body.eventName,
		'eventCategory': request.webtaskContext.body.eventCategory,
		'eventValue': request.webtaskContext.body.eventValue,
		'eventTime': Date.getTime()
	};
	MongoClient.connect(DB_URL, function(err, client) {
		const db = client.db()
		insertEvents(db, eventData, () => {
			client.close();
		});
	});
}

function insertEvents (db, eventData, callback) {
	let collection = db.collection('events');
	collection.insert(eventData, (error, results) => {
		callback(results);
	});
}