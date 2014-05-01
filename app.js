/**
 * Module dependencies.
 */
require('./models/user-model');
require('./models/goal-model');

var express = require('express');
var routes = require('./routes');
var mainPage = require('./routes/main');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.cookieParser('glacial temple'));
app.use(express.cookieSession());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/register', user.register);
app.post('/login', user.login);
app.get('/logout', user.logout);
// app.get('/main', mainPage.index);
app.post('/goal', mainPage.saveGoal);
app.get('/publicGoals', routes.publicGoals);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
