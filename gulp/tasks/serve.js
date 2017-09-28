var gulp    = require('gulp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var config  = require('../config');

gulp.task('serve', function(callback) {
    runSequence('watch', 'browserSync', callback);
    gulp.watch(config.browserSync.server.baseDir + "/*.html").on('change', browserSync.reload);
});