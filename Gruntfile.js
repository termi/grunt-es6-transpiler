/**
 * grunt-es6-transpiler
 * https://github.com/termi/grunt-es6-transpiler
 *
 * Author Egor Khalimonenko <1@h123.ru>
 * 
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        // Configuration to be run (and then tested).
        "es6-transpiler": {
            options: {},
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js'],
        },

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('test', ['nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', [
        'es6-transpiler',
        'test',
    ]);
};
