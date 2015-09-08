'use strict';

var gulp = require('gulp');

function isOnlyChange(event) {
  return event.type === 'changed';
}

module.exports = function(options) {
  gulp.task('watch', ['inject', 'jade', 'ts'], function() {

    gulp.watch([options.src + '/*.html', 'bower.json'], ['inject']);
    gulp.watch([options.src + '/**/*.jade'], ['jade']);
    gulp.watch([options.src + '/**/*.ts'], ['ts']);

    gulp.watch([options.src + '/assets/styles/**/*.scss'], function(event) {
      if(isOnlyChange(event)) {
        gulp.start('styles');
      }
    });

    gulp.watch(options.src + '/**/*.js', function(event) {
      if(isOnlyChange(event)) {
        gulp.start('scripts');
      } else {
        gulp.start('inject');
      }
    });

  });
};
