'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        browserify: {
            options: {
                plugin: ['proxyquire-universal', 'node-underscorify'],
                transform: [
                    ['node-underscorify', {
                        requires: [{'variable': '_', 'module': 'underscore'}]
                    }]
                ]
            },
            build: {
                src: 'JS/main.js',
                dest:'JS/builds/build.js'
            }
        },
        uglify: {
            build: {
                src: 'JS/builds/build.js',
                dest: 'JS/builds/build.min.js'
            }
        },
        concat: {
            build: {
                src: ['CSS/reset.css', 'CSS/topic_cloud.css'],
                dest: 'CSS/builds/styles.css'
            }
        },
        cssmin: {
            build: {
                src: 'CSS/builds/styles.css',
                dest: 'CSS/builds/styles.min.css'
            }
        }
      });


    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['browserify', 'uglify', 'concat', 'cssmin']);
};