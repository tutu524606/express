var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
    else next();
});

new Promise(function(resolve, reject) {
    var File = require('./fileSystem/file');
    var file_system = new File();
    file_system.readdir(__dirname + '/routes', function(routes, err) {
        if (err) {
            reject(err)
        } else {
            resolve(routes);
        }
    });
}).then(function(routes) {
    /**
     * routes是所有的路由文件：路由文件名将是路由地址，首页默认是index=》‘/’
     */
    routes.forEach(function(route) {
        var rn = route.includes('index') ? '/' : '/' + route.match(new RegExp(',?([a-z]+)\.js', 'i'))[1];
        var r = require('./routes/' + route);
        app.use(rn, r);
    });
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        next(createError(404));
    });
    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
}, function(err) {

})
module.exports = app;