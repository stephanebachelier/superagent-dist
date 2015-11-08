var browserify = require('browserify');
var fs = require('fs');
var path = require('path');
var trash = require('trash');
var chalk = require('chalk');

var filename = 'superagent.js';

function build () {
  console.log(chalk.green('Building superagent bundle : ' + filename));

  browserify()
    .require('superagent')
    .bundle()
    .pipe(fs.createWriteStream(path.join(__dirname, filename)));
}


trash([filename])
  .then(build)
  .catch(function (err) {
    console.log(chalk.red.bold('Failed to delete %s', filename));
    build();
   });
