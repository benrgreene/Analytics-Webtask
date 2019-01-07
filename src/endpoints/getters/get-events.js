/**
 * Get all events with a particular name
 */
function getEvents (request, response) {
	MongoClient.connect(DB_URL, function(err, client) {
		const db      = client.db(DB_NAME);
		let eventOptions = {
			'name': request.query.eventName ? request.query.eventName : 'notype'
		};
		findEvents(db, (docs) => {
			client.close();
			response.writeHead(400, { 'Content-Type': 'application/json'});
			response.end(JSON.stringify(docs));
		}, eventOptions);
	});
}
