/**
 * grunt-es6-transpiler
 * https://github.com/termi/grunt-es6-transpiler
 *
 * Author Egor Khalimonenko <1+g_es6_t@h123.ru>
 *
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    var fs = require('fs'),
        es6transpiler = require('es6-transpiler');

    grunt.registerMultiTask('es6-transpiler',
        'es6 transpiler',

        function () {
            var filesNum = 0,
                validRun = true,
            // Merge task-specific and/or target-specific options with these defaults.
                options = this.options();

            // Iterate over all specified file groups.
            this.files.forEach(function (mapping) {
                var tmpFileName = mapping.dest; // use the destination file as a temporary source one

                if (options.configURL) {
                    options.options = grunt.file.readJSON(options.configURL);
                    delete options.configURL;
                }

                if (mapping.dest) {
                    // If destination file provided, concatenate all source files to a temporary one.
                    grunt.file.write(
                        tmpFileName,
                        mapping.src.map(function (file) {
                            return grunt.file.read(file);
                        }).join('\n')
                    );

                    if (!runTask(tmpFileName, tmpFileName, options.options)) {
                        validRun = false;
                    }
                } else {
                    // Otherwise each file will have its own es6transpiler output.
                    mapping.src.map(function (file) {
                        if (!runTask(file, file + options.outputFileSuffix, options.options)) {
                            validRun = false;
                        }
                    });
                }
            });

            function runTask(srcPath, destPath, es6transpilerOptions) {
                filesNum++;

				es6transpilerOptions = es6transpilerOptions || {};
				es6transpilerOptions.src = grunt.file.read(srcPath);
				
                var es6transpilerOutput = es6transpiler.run( es6transpilerOptions );

                // Write the destination file.
                if (es6transpilerOutput.errors && es6transpilerOutput.errors.length) {
                    grunt.log.write('Generating "' + destPath + '" from "' + srcPath + '"...');
                    grunt.log.error();
                    es6transpilerOutput.errors.forEach(function (error) {
                        grunt.log.error(error);
                    });
                    return false;
                }

                // Remove the temporary destination file if existed.
                if (fs.existsSync(destPath)) {
                    fs.unlinkSync(destPath);
                }

                // Write es6transpiler output to the target file.
                grunt.file.write(destPath, es6transpilerOutput.src);

                return true;
            }

            if (validRun) {
                if (filesNum < 1) {
                    validRun = false;
                    grunt.log.error('No files provided to the es6transpiler task.');
                } else {
                    grunt.log.ok(filesNum + (filesNum === 1 ? ' file' : ' files') + ' successfully generated.');
                }
            }
            return validRun;
        });

};
