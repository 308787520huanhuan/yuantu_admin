"use strict";
const express = require("express");
const viewrouter = require("./views/routes/viewrouter");
const http = require("http");
const path = require("path");
//打印日志
var log4js = require('log4js');
const vpm = require("./views/scripts/manager");
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
app.use(cookieParser());
//session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    name: 'pm',
    cookie: { secure: false }
}));
app.use(app.router);
app.use(multipart({ uploadDir: './temp' }));
log4js.configure({
    appenders: [
        {
            type: "file",
            filename: "app.log"
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
app.post('/upload', multipartMiddleware, function (req, res) {
    console.log(req.body);
    console.log(req.files);
});
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
//# sourceMappingURL=app.js.map