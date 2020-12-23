#!/usr/bin/env node

var
    program = require('commander'),
    path = require('path'),
    browserSync = require('browser-sync').create();
    util = require('gulp-util');



/* ######################## OPTIONS ######################## */
var options = {};


/* ######################## VERSION ######################## */
program
    .version(
        'commander-gulp-server version: ' + require('../package.json').version + '\n'
    )


/* ######################## GULP TEMPLATES ######################## */
// node ./bin/server.js server \"8080\" --ser \"docs/\""'
program
    .command('server <dir>')
    .option("--ser [options]")
    .action((input, options) => {
        var input = options.input || options.parent.rawArgs;
        var ouput = options.ouput || options.ser;
        input = input.filter(function (index, value) {
            if (path.extname(index) == input[3]) {
                return index;               
            }
        });
      
        return browserSync.init({
            
            
            port: parseInt(input),
            
            watch: true,
            open: false,
            server: {
                baseDir: ouput,
                serveStaticOptions: {
                    extensions: [
                        "html",
                        "css",
                        "js"
                    ]
                }
            }            
        });  
    })

program.parse(process.argv);

