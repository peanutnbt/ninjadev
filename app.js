var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pg = require('pg');
const fs = require('fs');
//configs
var env_configs = require('./server/configs/env.configs');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

var app = express();

//cors
var cors = require('cors');
var app = express();
app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'client/views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout extractScripts', true)
app.set('layout extractStyles', true)

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'client/public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/public')));

// required for passport
app.use(session({
    secret: 'xteam007',
    proxy: true,
    resave: true,
    unset: 'destroy',
    saveUninitialized: true
})); // session secret

//config passport
require('./server/configs/passport')(passport);

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//route API
var customer = require('./server/modules/customer/customer.router');
app.use('/api/v1/customer', customer);


//route view
// TODO tam thoi - cần cấu hình lại
app.get('/web-co-ban', function (req, res, next) {
    res.render('courses/web-basic');
});

app.get('/web-nang-cao', function (req, res, next) {
    res.render('courses/web-advanced');
});
app.get('/web-free', function (req, res, next) {
    res.render('courses/web-free');
});

app.get('/', function(req, res, next) {
    res.render('index');
})
 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    if (err.status == 404) {
        res.render('error/404');
    } else {
        // render the error page
        res.status(err.status || 500);
        res.render('error');
    }
    
});

module.exports = app;