'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  gulp.task('scripts', function() {
    return gulp.src([options.src + '/**/*.js'])
      .pipe(gulp.dest(options.tmp + '/serve/'));
  });
};
