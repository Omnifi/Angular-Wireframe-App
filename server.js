'use strict';

var init = require('./app/init')(),
    config = require('./app/config'),
    chalk = require('chalk'),
    fs = require('fs');

//if(process.env.NODE_ENV === 'development')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// Init the express application
var app = require('./app/express')();

//start http server
app.listen(config.port, function() {
    console.log('Server started on port ' + config.port);
});

// Expose app
exports = module.exports = app;
