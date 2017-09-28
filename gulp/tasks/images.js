var gulp        = require('gulp');
var changed     = require('gulp-changed');
var rename      = require('gulp-rename');
var imagemin    = require('gulp-imagemin');
var raster      = require('gulp-raster');
var pngquant    = require('imagemin-pngquant');
var config      = require('../config').images;

var debug = require('gulp-debug');

gulp.task('svg2png', function() {
    return gulp.src(config.rasterSrc)
        .pipe(changed(config.dest))
        .pipe(raster())
        .pipe(rename({extname: '.png'}))
        .pipe(gulp.dest(config.rasterDest));
});

gulp.task('images:raw', function() {
    return gulp.src(config.rawSrc)
        .pipe(changed(config.dest))
        .pipe(gulp.dest(config.dest));
});

gulp.task('images', ['svg2png', 'images:raw'], function() {
    return gulp.src(config.src)
        .pipe(changed(config.dest))
        .pipe(gulp.dest(config.dest));
});