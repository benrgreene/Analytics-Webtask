<!DOCTYPE html>
<html>
	<head>
		<title>Analytics Webtask Test</title>
	</head>
	<body>
		<h2>Testing Setup</h2>
		<table>
			<tr>
				<td>Webtask Base URL:</td>
				<td><input type="text" id="js-webtask-url" /></td>
			</tr>
			<tr>
				<td>Webtask Auth0 Token:</td>
				<td><input type="text" id="js-token" /></td>
			</tr>
		</table>
		<h2>Test posting to the DB</h2>
		<form method="POST" id="js-post-form" action="">
			<table>
				<tr>
					<td>Event Name</td>
					<td><input type="text" name="eventName" id="eventName" value="asdf" /></td>
				</tr>
				<tr>
					<td>Event Category</td>
					<td><input name="eventCategory"  value="asdf" /></td>
				</tr>
				<tr>
					<td>Event Value</td>
					<td><input name="eventValue"  value="asdf" /></td>
				</tr>
			</table>
			<input type="submit" value="Submit" />
		</form>
		<h2>Update Event</h2>
		<form method="POST" id="js-put-form" action="">
			<table>
				<tr>
					<td>Event Name</td>
					<td><input type="text" name="eventName" value="asdf" /></td>
				</tr>
				<tr>
					<td>Event Category</td>
					<td><input name="eventCategory" value="asdf" /></td>
				</tr>
				<tr>
					<td>Event Value</td>
					<td><input name="eventValue" value="asdf" /></td>
				</tr>
			</table>
			<input type="submit" value="Submit" />
		</form>
		<h2>GET Requests</h2>
		<table>
			<tr>
				<td>Get all events:</td>
				<td><button id="js-btn-get-all">Get All Events</button></td>
			</tr>
			<tr>
				<td><input id="js-get-name" placeholder="Get Events Of Type" /></td>
				<td><button id="js-btn-get-type">Get All Events</button></td>
			</tr>
		</table>
		<!--
			This is to allow us to dynamically set our webtask's URL & our token (for getting events)
		-->
		<script>
			const webtaskUrl = document.querySelector('#js-webtask-url');
			const postForm   = document.querySelector('#js-post-form');
			const putForm    = document.querySelector('#js-put-form');
			const eventName  = document.querySelector('#js-get-name');
			const getAllBtn  = document.querySelector('#js-btn-get-all');
			const getType    = document.querySelector('#js-btn-get-type');
			const token      = document.querySelector('#js-token');

			webtaskUrl.addEventListener('change', (event) => {
				postForm.setAttribute('action', `${webtaskUrl.value}/AddEvent`)
				putForm.setAttribute('action', `${webtaskUrl.value}/UpdateEvent`)
			});

			getAllBtn.addEventListener('click', (event) => {
				let url = `${webtaskUrl.value}/AllEvents?access_token=${token.value}`;
				fetch(url)
				.then((blob) => { 
					return blob.json() 
				})
				.then((data) => {
					console.log(data);
				})
			});

			getType.addEventListener('click', (event) => {
				let url = `${webtaskUrl.value}/Events?access_token=${token.value}&eventName=${eventName.value}`;
				fetch(url)
				.then((blob) => { 
					return blob.json() 
				})
				.then((data) => {
					console.log(data);
				})
			});
		</script>
	</body>
</html>