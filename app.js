
/**
 * Module dependencies.
 */

 var express = require('express');
 var routes = require('./routes');
 var http = require('http');
 var path = require('path');


//port on which the node server listens
 var PORT = 4000;


//setting up server to run
 var app = express()
 , http = require('http')
 , server = http.createServer(app)

 //setting up socket.io to listen for requests


// all environments
app.set('port', process.env.PORT || PORT);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/places*', routes.places);

server.listen(PORT);



