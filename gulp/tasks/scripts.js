var gulp     = require('gulp');
var uglify   = require('gulp-uglify');
var rename   = require('gulp-rename');
var concat   = require('gulp-concat');
var gulpif   = require('gulp-if');
var notify   = require('gulp-notify');
var gutil    = require('gulp-util');
var changed  = require('gulp-changed');
var babel    = require('gulp-babel');
var lazypipe = require('lazypipe');
var config   = require('../config').scripts;
var options  = require('../config').options;
var bower    = require('../config').bower;

var build = lazypipe()
    .pipe(uglify)
    .pipe(rename, {extname: '.min.js'})
    .pipe(gulp.dest, config.dest);

var bowerFiles = [];

if (bower && options.target in bower) {
    bowerFiles = bower[options.target];
}

gulp.task('scripts:copy', function() {
    var dest = config.dest + '/vendor';
     return gulp.src(config.copy)
        .pipe(changed(dest))
        .pipe(uglify())
        .pipe(gulp.dest(dest));
});

gulp.task('scripts', ['scripts:copy'], function() {
    return gulp.src(bowerFiles.concat(config.src))
        .pipe(concat('app.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(config.dest))
        .pipe(gulpif(options.production, build()));
});
