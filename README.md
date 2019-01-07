# Basic Analytics Solution via Webtask/MongoDB

This is a simple analytics solution making use of Webtask and MongoDB. You'll need to both setup a [Webtask account](https://webtask.io/) and somewhere you can host a MongoDB instance (I've used [MongoLabs](https://mlab.com/)).

## Setup

First thing after pulling down the repo is that you'll need to add your DB credentials. Copy the file contents from `./src/_creds-example.js` into a new file: `./src/_crds.js` and enter your own database's credentials.

Next, run `npm install` to make sure you've got gulp/npm all setup.

Now, run `gulp scripts` in terminal (in the project directory) to build the project! You can create a new Webtask from the resulting file (`./analytics.js`). When you do, make sure you setup the Webtask's node modules AND pass in Auth0 credentials when creating.

## Using