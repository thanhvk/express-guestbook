var http = require('http');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

var entries = [
	{
		title: 'Express',
		body: 'Fast, unopinionated, minimalist web framework for Node.js',
		date: new Date()
	},
	{
		title: 'Using middleware',
		body: 'Express is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls.',
		date: new Date()
	}
];

app.get('/', (req, res) => {
	res.render('index', {
		entries: entries
	});
});

app.get('/new-entry', (req, res) => {
	res.render('new-entry');
});

app.post('/new-entry', (req, res) => {
	if (!req.body.title || !req.body.body) {
		res.status(400).send('Entries must have a title and a body');
		return;
	}
	
	entries.push({
		title: req.body.title,
		body: req.body.body
	});

	res.redirect('/');
});

http.createServer(app).listen(3000, () => {
	console.log('Server listening at port 3000');
});