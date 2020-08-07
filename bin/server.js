#!/usr/bin/env node

var
    gulp = require('gulp'),
    mkdirp = require('mkdirp'),
    debug = require('gulp-debug'),
    program = require('commander'),
    browserSync = require('browser-sync').create();
    rimraf = require('rimraf'),
    util = require('gulp-util')

;



/* ######################## OPTIONS ######################## */
var options = {};


/* ######################## VERSION ######################## */
program
    .version(
        'commander-gulp-server version: ' + require('../package.json').version + '\n'

    )
    .option('-m, --mkdirp <path>', 'create folder', createFolder)
    .option('-r, --rimraf <path>', 'delete folder', deleteFolder)


/* ######################## CREATE FOLDERS ######################## */
function createFolder(dir) {
    mkdirp(dir, function (err) {
        if (err) {
            console.error(err)
        } else {
            console.log(dir)
        }
    })
}


/* ######################## DELETE FOLDERS ######################## */
function deleteFolder(dir) {
    rimraf(dir, function (err) {
        if (err) {
            console.error(err)
        } else {
            console.log(dir)
        }
    })
}


/* ######################## GULP TEMPLATES ######################## */
// node ./bin/server.js server \"8080\" --ser \"docs/\""'
program
    .command('server <dir>')
    .option("--ser [options]")
    .action((input, options) => {
        var input = options.input || options.parent.rawArgs;
        var ouput = options.ouput || options.ser;
        input = input.filter(function (index, value) {
            if (index.slice((index.lastIndexOf(".") - 1 >> 0) + 2) == input[3]) {
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
                        "css"
                    ]
                }
            }            
        });  
    })

program.parse(process.argv);

