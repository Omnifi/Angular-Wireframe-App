'use strict';

var glob = require('glob'),
	chalk = require('chalk');

module.exports = function() {
	if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
	glob('./app/env/' + process.env.NODE_ENV + '.js', {
		sync: true
	}, function(err, environmentFiles) {
		if (!environmentFiles.length) {
			console.log(chalk.red('No configuration file found for "' + process.env.NODE_ENV + '" environment using development instead'));
			process.exit();
		} else {
			console.log(chalk.magenta('*** ' + process.env.NODE_ENV + ' mode started ***'));
		}
	});

};