var gulp        = require('gulp');
var iconfont    = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var lodash      = require('lodash');
var rename      = require('gulp-rename');
var config      = require('../config').iconfont;

gulp.task('iconfont', function() {
    return gulp.src(config.src)
        .pipe(iconfont({
            fontName: config.name,
            normalize: true
        }))
        .on('codepoints', function(codepoints, options) {
            gulp.src(config.template)
                .pipe(consolidate('lodash', {
                    glyphs: codepoints,
                    fontName: config.name,
                    fontPath: config.path
                }))
                .pipe(rename({extname: '.styl'}))
                .pipe(gulp.dest(config.css));
        })
        .pipe(gulp.dest(config.dest));
});