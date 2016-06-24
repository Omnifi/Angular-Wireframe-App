'use strict';

var proxy = require('./middlewares/proxy');

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/app/*', function(req, res) {
        res.render('app', {
            localtitle: 'Loading - '
        });
    });

    app.all('/proxy*', proxy);

    //force 500
    app.get('/500', function(req, res, next) {
        return next(new Error('This is a test 500 error!'));
    });

};
