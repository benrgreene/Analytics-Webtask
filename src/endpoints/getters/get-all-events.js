/**
 * Get all event names
 */
function getAllEvents (request, response) {
	MongoClient.connect(DB_URL, function(err, client) {
		const db = client.db(DB_NAME);
		findEvents(db, (docs) => {
			client.close();
			response.writeHead(400, { 'Content-Type': 'application/json'});
			response.end(JSON.stringify(docs));
		}, {});
	});
}

function findEvents (db, callback, options) {
	let collection = db.collection('events');
	collection.find(options).toArray((err, docs) => {
		callback(docs)
	});
}