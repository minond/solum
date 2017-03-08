"use strict";
var express = require("express");
var config = require("acm");
var express_1 = require("express");
var swig_1 = require("swig");
var dotenv = require("dotenv");
var favicon = require("serve-favicon");
var body = require("body-parser");
var compression = require("compression");
var cookie = require("cookie-parser");
var session = require("express-session");
function configuration() {
    dotenv.config({ silent: true });
    return config;
}
exports.configuration = configuration;
;
function bootstrap(config) {
    if (config === void 0) { config = configuration(); }
    var app = application(config);
    app.listen(config('port'));
    return { app: app, config: config };
}
exports.bootstrap = bootstrap;
;
function application(config) {
    var app = express();
    var MANIFEST = config('app.manifest');
    var VIEW_CACHE = config('app.server.view_cache');
    var COMPRESSION = config('app.server.compression');
    var ROBOTS_TXT = config('app.server.robots_txt');
    var BODY_PARSING = config('app.server.body_parsing');
    var SESSION = config('app.server.session');
    var COOKIES = config('app.server.cookies');
    var KEY_COOKIE = config('key.cookie');
    var KEY_SESSION = config('key.session');
    app.set('x-powered-by', false);
    app.set('view cache', true);
    app.set('view engine', 'html');
    app.set('views', './assets/views');
    app.engine('html', swig_1.renderFile);
    if (VIEW_CACHE) {
        app.set('view cache', false);
        swig_1.setDefaults({ cache: false });
    }
    app.use(favicon('assets/images/favicon.ico'));
    app.get('/manifest.json', function (_req, res) {
        return res.json(MANIFEST);
    });
    app.use('/robots.txt', express_1.static(ROBOTS_TXT ?
        'assets/resources/robots.txt' :
        'assets/resources/nobots.txt'));
    if (COMPRESSION) {
        app.use(compression());
    }
    app.use('/assets', express_1.static('assets'));
    app.use('/dist', express_1.static('dist'));
    app.use('/node_modules', express_1.static('node_modules'));
    if (BODY_PARSING) {
        app.use(body.json());
        app.use(body.urlencoded({ extended: true }));
    }
    if (COOKIES) {
        app.use(cookie(KEY_COOKIE));
    }
    if (SESSION) {
        app.use(session({
            name: 'sid',
            secret: KEY_SESSION,
            saveUninitialized: false,
            resave: false
        }));
    }
    return app;
}
exports.application = application;
;
