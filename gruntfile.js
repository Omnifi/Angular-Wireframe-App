'use strict';

module.exports = function(grunt) {

    var fileArrays = {
        serverJS: ['gruntfile.js', 'server.js', './app/**/*.*'],
        views: ['public/modules/views/**/*.html'],
        jquery: 'public/lib/jquery/dist/jquery.js',
        js: [
            'node_modules/moment/moment.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-resource/angular-resource.js',
            'node_modules/angular-sanitize/angular-sanitize.js',
            'node_modules/angular-touch/angular-touch.js',
            'node_modules/angular-route/angular-route.js',
            'node_modules/angular-ui-utils/modules/route/route.js',
            'node_modules/ngstorage/ngStorage.js',
            'public/lib/angular-websql/angular-websql.js',
            //'node_modules/angular-ui-calendar/src/calendar.js',
            //'node_modules/angular-utils-pagination/dirPagination.js',
            //'node_modules/angular-truncate-2/dist/angular-truncate-2.js',
            'node_modules/bootstrap/dist/js/bootstrap.js',
            //'node_modules/eonasdan-bootstrap-datetimepicker-npm/build/js/bootstrap-datetimepicker.min.js',
            //'node_modules/slick-carousel/slick/slick.js',
            //'node_modules/fullcalendar/dist/fullcalendar.js',
            'public/application.js',
            'public/modules/**/**/*.js'
        ],
        less: ['less/**/*.*']
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            js: 'public/dist/*.js',
            css: 'public/dist/*.css',
            temp: ['public/dist/angular_app.js', 'public/dist/templates.js']
        },
        copy: {
            js: {
                src: [
                    'public/js/header_scripts.js'
                ],
                dest: 'public/dist/',
                expand: true,
                flatten: true
            }
        },
        ngAnnotate: {
            dev: {
                files: {
                    'public/dist/angular_app.js': fileArrays.js
                }
            }
        },
        ngtemplates: {
            'angular-wireframe-app': {
                src: 'public/modules/views/partials/**.html',
                dest: 'public/dist/templates.js',
                options: {
                    url: function(url) {
                        return url.replace('public/', '');
                    }
                }
            }
        },
        concat: {
            js: {
                files: {
                    'public/dist/application.js': [fileArrays.jquery, 'public/dist/angular_app.js', 'public/dist/templates.js']
                }
            }
        },
        jshint: {
            all: {
                src: 'public/modules/**/*.js',
                options: {
                    jshintrc: true
                }
            }
        },
        less: {
            dev: {
                options: {
                    paths: ['less/'],
                    sourceMap: true,
                    outputSourceFiles: true,
                    ieCompat: false
                },
                files: {
                    'public/dist/style.css': 'less/style.less'
                }
            },
            prod: {
                options: {
                    paths: ['less/'],
                    sourceMap: false,
                    ieCompat: false
                },
                files: {
                    'public/dist/style.css': 'less/style.less'
                }
            }
        },
        watch: {
            options: {
                livereload: true,
                interrupt: true,
                nospawn: true,
                forever: true
            },
            js: {
                files: fileArrays.js,
                tasks: ['js']
            },
            html: {
                files: fileArrays.views,
                tasks: ['js']
            },
            css: {
                files: fileArrays.less,
                tasks: ['less:dev']
            }
        },
        execute: {
            target: {
                src: ['server.js']
            }
        },
        concurrent: {
            launch: ['watch', 'execute:target'],
            options: {
                logConcurrentOutput: true,
                limit: 10
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.option('force', true);

    grunt.registerTask('default', [
        'css',
        'js',
        'concurrent:launch'
    ]);

    grunt.registerTask('js', [
        'clean:js',
        'copy:js',
        'ngtemplates',
        'ngAnnotate',
        'concat:js',
        'clean:temp'
    ]);

    grunt.registerTask('css', [
        'clean:css',
        'less:dev'
    ]);

    grunt.registerTask('hint', [
        'jshint'
    ]);

};
