// Get dependencies
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
// Get our API routes
const api = require('./api.js');

process
	.on('unhandledRejection', (reason, promise) => {
		console.error('Unhandled Rejection at Promise:', reason, promise);
	})
	.on('uncaughtException', (error) => {
		console.error('Uncaught Exception thrown:', error);
		process.exit(1);
    });
    

const app = express();
// Parsers for POST data
app.use(bodyParser.raw({ type: 'application/jwt' }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({
	limit: "50mb", extended: true, parameterLimit: 50000
}));

app.use(cors());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
// Set our API routes
app.use('/api', api);
// Catch all other routes and return the index file
// app.get('*', (req, res) => {res.sendFile(path.join(__dirname,'dist/index.html'))});
// Get port from environment and store in Express
const port = process.env.PORT || '3000';
app.set('port', port);
// Create HTTP server
app.listen(port, () => {
	console.info('Node server listening on port ' + port);
});