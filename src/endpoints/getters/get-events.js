/**
 * Get all events with a particular name
 */
function getEvents (request, response) {
	response.writeHead(400, { 'Content-Type': 'application/json'});
	response.end(JSON.stringify({'hello': 'world'}));
}