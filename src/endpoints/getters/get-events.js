/**
 * Get all events with a particular name
 */
function getEvents (request, response) {
	MongoClient.connect(DB_URL, function(err, client) {
		const db      = client.db(DB_NAME);
		let eventType = 'test';
		findSpecificEvents(db, eventType, (docs) => {
			client.close();
			response.writeHead(400, { 'Content-Type': 'application/json'});
			response.end(JSON.stringify(docs));
		});
	});
}

function findSpecificEvents (db, eventType, callback) {
	let collection = db.collection('events');
	collection.find({
		'name': eventType
	}).toArray((err, docs) => {
		callback(docs)
	});
}