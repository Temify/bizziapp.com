var gulp    = require('gulp');
var config  = require('../config');
var runSequence = require('run-sequence');

gulp.task('setWatch', function() {
    global.isWatching = true;
});

gulp.task('watch', ['build', 'setWatch'], function() {
    gulp.watch(config.styles.watch, ['styles']);
    gulp.watch(config.images.watch, function() {
        runSequence('images', 'styles');
    });
    gulp.watch(config.iconfont.src, ['iconfont']);
    gulp.watch(config.fonts.src, ['fonts']);
    gulp.watch(config.jade.watch, ['jade']);
    gulp.watch(config.sprites.watch, ['sprites']);
    gulp.watch(config.scripts.watch, ['scripts']);
});
