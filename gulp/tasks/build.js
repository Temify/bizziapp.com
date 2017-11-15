var gulp = require('gulp');
var runSequence = require('run-sequence');
var options = require('../config').options;

gulp.task('build', function(callback) {
    runSequence(['iconfont', 'jade'], ['fonts', 'images'], ['styles', 'scripts'], callback);
});
