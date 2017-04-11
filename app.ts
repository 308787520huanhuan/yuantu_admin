import express = require('express');
import viewrouter = require('./views/routes/viewrouter');
import http = require('http');
import path = require('path');
import qs = require('qs');
//打印日志
var log4js = require('log4js');
import vpm = require('./views/scripts/manager')
import schedule = require("node-schedule");
import util = require('./scripts/util');
import fs = require('fs');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var cookieParser = require('cookie-parser');
//session包
var session = require('express-session');

var app = express();

// all environments
app.set('port', '3000');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
//app.use(express.logger(':req[Content-Length]'));
app.use(express.logger('tiny'));
app.use(express.json());
app.use(express.urlencoded());
//app.use(express.multipart());
app.use(express.methodOverride());

app.use(cookieParser())
//session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  name:'pm',
  cookie: { secure: false }
}))

app.use(app.router);
app.use(multipart({uploadDir:'./temp' }));
log4js.configure({
  appenders: [
    {
      type: "file",
      filename: "app.log"
      // category:'app' //之间加了category后发现无法写入文件，
    },
    {
      type: "console"
    }
  ],
  replaceConsole: true
});

//import stylus = require('stylus');
//app.use(stylus.middleware(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// manager init;
console.log(vpm.handle().reloadAllPlugins());

app.get('/', viewrouter.login);
app.get('/views/:handerClass/:handerMethod', viewrouter.viewGet);
app.post('/views/:handerClass/:handerMethod', viewrouter.viewPost);
app.use(express.static(path.join(__dirname, 'views/')));

app.post('/upload', multipartMiddleware, function(req, res){
    console.log(req.body)
    console.log(req.files)
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
