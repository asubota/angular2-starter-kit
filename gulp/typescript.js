'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  var config = $.typescript.createProject(options.src + '/tsconfig.json');

  gulp.task('ts', function() {
    return gulp.src(options.src + '/**/*.ts')
      .pipe($.typescript(config))
      .pipe(gulp.dest(options.tmp + '/serve/'))
      .pipe(browserSync.reload({ stream: true }));
  });
};
