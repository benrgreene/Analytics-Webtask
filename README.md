# Basic Analytics Solution via Webtask/MongoDB

This is a simple analytics solution making use of Webtask and MongoDB. You'll need to both setup a [Webtask account](https://webtask.io/) and somewhere you can host a MongoDB instance (I've used [MongoLabs](https://mlab.com/)).

## Setup

First thing after pulling down the repo is that you'll need to add your DB credentials. Copy the file contents from `./src/_creds-example.js` into a new file: `./src/_creds.js` and enter your own database's credentials.

Next, run `npm install` to make sure you've got gulp/npm all setup.

Now, run `gulp scripts` in terminal (in the project directory) to build the project! You can create a new Webtask from the resulting file (`./analytics.js`). When you do, make sure you setup the Webtask's node modules AND pass in Auth0 credentials when creating.

## Using The Webtask

First this to point out is that when POSTing to the webtask, you can't just pass in JSON. Data needs to be passed in as if it were a form being posted. If you're doing the POST in JavaScript, here's an example of how you can achieve that:

```
// This is the URL to your specific webtask:
const baseURL = '...';

// Build our data to pass (note, not all our webtask endpoints need all these parameters!)
let formData = new FormData();
formData.append('eventName', 'My event');
formData.append('eventCategory', 'My Category');
formData.append('eventValue', 'Some value to save');

// Notice we aren't setting any headers!
fetch(`${baseURL}/AddEvent`, {
    body: formData,
    method: "post"
});
```

There are five endpoints in the webtask. Let's go through them and see their requirements and what they do:

### Adding an Event

This is an andpoint to add a new event to the database, with endpoint being `/AddEvent`. This isn't a protected endpoint, so you don't need to pass any auth token.

Here is an example of the accepted body parameters for a failed login attempt:

```
{
	eventName: "Failed login",
	eventCategory: "Admin action",
	eventValue: `Someone failed login with username: ${username}`
}
```

### Updating an Event

Sometimes, you'll want to update an event instead of adding a new one (such as last time something was edited, and by who). The endpoint is `/UpdateEvent`, and like the previous endpoint, doesn't require an auth token.

It takes the same parameters as `/AddEvent`, but uses the `eventName` parameter to identify the event to update. If no event with the name is found, it will create a new event.

### Increment Event

This one is for incrementing a number value associated with an event (negative values are accepted). This one is useful for things such as tracking page loads or number of times a specific post was read. The endpoint is `/IncrementValue`, and isn't protected (no auth token required).

It requires only two body parameters:

```
{
	eventName: "Page loads",
	eventValue: 1
}
```

### Get All Events

This one returns all events in the database, and is protected (so you'll need to pass an auth token). The andpoint is `/AllEvents`. 

Here's an example query. Let's assume that the `baseURL` is the same as the first example, and that the `authToken` variable is a token you got from logging into Auth0.

```
let queryURL = `${baseURL}/AllEvents?token=${authToken}`
```

### Get Events By Name

This will return all events that have a name specified by the name passed in. It is protected. Here's an example query string (remember to URL encode your query string!):

```
let queryURL = `${baseURL}/AllEvents?eventName=Event%20Name&access_token=${authToken}`
```