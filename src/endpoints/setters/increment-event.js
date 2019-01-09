/** 
 * Increment the value of an event. 
 * Should take in an integer for the event value
 */
function incrementEvent (request, response) {
	MongoClient.connect(DB_URL, function(err, client) {
		const db         = client.db(DB_NAME);
		const eventQuery = {
			'eventName': request.body.eventName ? request.body.eventName : 'notype'
		};
		findEvents(db, (docs) => {
			// If there are any results, update the first
			if (docs.length > 0) {
				// Need to make sure all data passed are actual integers, not string representations of numbers
				let value          = docs[0].eventValue || 0;
				let incrementValue = request.body.eventValue || 0;
				value              = parseInt(docs[0].eventValue);
				incrementValue     = parseInt(incrementValue);
				value += incrementValue;
				// Now we can update the value in the DB
				updateEventInDB(db, eventQuery, {
					$set: {'eventValue': value}
				});
				response.writeHead(200, { 'Content-Type': 'application/json'});
				response.end(JSON.stringify({'content': 'updated'}));
			}
			response.writeHead(400, { 'Content-Type': 'application/json'});
			response.end(JSON.stringify({'content': 'no content found to update'}));
		}, eventQuery);
	});
}