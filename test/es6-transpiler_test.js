'use strict';

var grunt = require('grunt'),
    es6Transpiler = require('es6-transpiler');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.es6Transpiler = {
    setUp: function (done) {
        this.options = {
            options: {
                disallowVars: true,
                disallowDuplicated: true,
                disallowUnknownReferences: false,
            },
        };
        done();
    },
    simple_example: function (test) {
        test.expect(2);

		this.options.src = grunt.file.read('test/fixtures/simple_example.js');

        var output = es6Transpiler.run( this.options ),
            expected = grunt.file.read('test/expected/simple_example.js');

        test.equal(output.errors.length, 0, 'should provide no errors.');
        if (output.errors && output.errors.length) {
            test.done();
            return;
        }

        test.equal(output.src, expected, 'should transform consts & lets to vars.');

        test.done();
    },
};
