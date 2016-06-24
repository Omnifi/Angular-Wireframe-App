'use strict';

var _ = require('lodash'),
    glob = require('glob');

module.exports = _.extend(
    require('./env/all'),
    require('./env/' + process.env.NODE_ENV) || {}
);

module.exports.getGlobbedFiles = function(globPatterns, removeRoot) {
    var _this = this;
    var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');
    var output = [];
    if (_.isArray(globPatterns)) {
        globPatterns.forEach(function(globPattern) {
            output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
        });
    } else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        } else {
            glob(globPatterns, {
                sync: true
            }, function(err, files) {
                if (removeRoot) {
                    files = files.map(function(file) {
                        return file.replace(removeRoot, '');
                    });
                }
                output = _.union(output, files);
            });
        }
    }
    return output;
};

module.exports.initLocalVariables = function(app) {

    // Setting application local variables
    app.locals.title = this.title;
    app.locals.description = this.description;
    app.locals.keywords = this.keywords;
    app.locals.author = this.author;
    app.locals.api = this.api;
    app.locals.env = process.env;

};

