'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'del']
});

module.exports = function(options) {
  gulp.task('styles', function() {
    var sassOptions = {
      style: 'expanded'
    };

    return gulp.src([
      options.src + '/assets/**/*.scss'
    ])
      .pipe($.sass(sassOptions)).on('error', options.errorHandler('Sass'))
      .pipe($.autoprefixer()).on('error', options.errorHandler('Autoprefixer'))
      .pipe(gulp.dest(options.tmp + '/serve/assets/'))
      .pipe(browserSync.reload({ stream: true }));
  });
};
