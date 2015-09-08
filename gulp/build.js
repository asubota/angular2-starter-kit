'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'del']
});

module.exports = function(options) {
  gulp.task('html', ['inject', 'jade'], function() {
    var htmlFilter = $.filter('*.html', {restore: true});
    var jsFilter = $.filter('**/*.js', {restore: true});
    var cssFilter = $.filter('**/*.css', {restore: true});
    var assets;

    return gulp.src(options.tmp + '/serve/*.html')
      .pipe(assets = $.useref.assets())
      .pipe($.rev())
      .pipe(jsFilter)
      .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', options.errorHandler('Uglify'))
      .pipe(jsFilter.restore)
      .pipe(cssFilter)
      .pipe($.csso())
      .pipe(cssFilter.restore)
      .pipe(assets.restore())
      .pipe($.useref())
      .pipe($.revReplace())
      .pipe(htmlFilter)
      .pipe($.minifyHtml({
        empty: true,
        spare: true,
        quotes: true,
        conditionals: true
      }))
      .pipe(htmlFilter.restore)
      .pipe(gulp.dest(options.dist))
      .pipe($.size({ title: options.dist + '/', showFiles: true }));
  });

  gulp.task('fonts', function () {
    return gulp.src(options.src + '/assets/fonts/*')
      .pipe(gulp.dest(options.dist + '/assets/fonts'));
  });

  gulp.task('images', function () {
    return gulp.src(options.src + '/assets/images/**/*')
      .pipe(gulp.dest(options.dist + '/assets/images/'));
  });

  gulp.task('misc', function () {
    return gulp.src(options.src + '/**/*.ico')
      .pipe(gulp.dest(options.dist));
  });

  gulp.task('js', ['scripts'], function () {
    return gulp.src(options.tmp + '/serve/**/*.js')
      .pipe(gulp.dest(options.dist));
  });

  gulp.task('build', ['html', 'fonts', 'images', 'misc', 'js']);
};
