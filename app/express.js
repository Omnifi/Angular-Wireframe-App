'use strict';

var fs = require('fs'),
    express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    compress = require('compression'),
    methodOverride = require('method-override'),
    helmet = require('helmet'),
    config = require('./config'),
    consolidate = require('consolidate'),
    favicon = require('serve-favicon'),
    path = require('path')

module.exports = function() {

    // Initialize express app
    var app = express();

    // uncomment after placing your favicon in /public
    app.use(favicon('public/favicon.ico'));

    // Should be placed before expr./ess.static
    // app.use(compress({
    //     filter: function(req, res) {
    //         return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    //     },
    //     level: 9
    // }));

    app.use(function(req, res, next) {
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        next();
    });

    // Set views path and view engine
    app.engine('server.view.html', consolidate[config.templateEngine]);
    app.set('view engine', 'server.view.html');
    app.set('views', './app/views');

    // Environment dependent middleware
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
        app.set('view cache', false);
    } else if (process.env.NODE_ENV === 'production') {
        app.locals.cache = 'memory';
    }

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    // Initialize local variables
    config.initLocalVariables(app);

    // Use helmet to secure Express headers
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.ienoopen());
    app.disable('x-powered-by');

    // Setting the app router and static folder
    app.use(express.static(path.resolve('./public')));

    // Init the routes
    require('./routes')(app);

    //500
    app.use(function(err, req, res, next) {
        if (!err) return next();
        console.error(err.stack);
        res.status(500).render('500', {
            error: (process.env.NODE_ENV === 'development') ? err.stack : err.message
        });
    });

    //404
    app.use(function(req, res) {
        res.status(404).render('404', {
            url: req.originalUrl,
            error: 'Not Found'
        });
    });

    return app;
};
