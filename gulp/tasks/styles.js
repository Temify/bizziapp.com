var gulp            = require('gulp');
var stylus          = require('gulp-stylus');
var postcss         = require('gulp-postcss');
var sourcemaps      = require('gulp-sourcemaps');
var cmq             = require('gulp-combine-media-queries');
var gcmq            = require('gulp-group-css-media-queries');
var csso            = require('gulp-csso');
var gulpif          = require('gulp-if');
var rename          = require('gulp-rename');
var lazypipe        = require('lazypipe');
var path            = require('path');
var handleErrors    = require('../util/handleErrors');
var config          = require('../config').styles;
var options         = require('../config').options;
var debug           = require('gulp-debug');
var fs              = require('fs');

/**
 * Postcss modules
 */
var pixrem          = require('pixrem')('10px', {atrules: true});
var autoprefixer    = require('autoprefixer');
var url             = require('postcss-url')({
    url: function(url, postObject) {
        var imagePath = path.resolve(config.dest, url);
        var time = false;
        if (fs.existsSync(imagePath)) {
            var index = url.lastIndexOf('.');
            time = Math.round((new Date(fs.statSync(imagePath).mtime)).getTime()/1000) + '';
            url = url.substring(0, index) + '.' + time + url.substring(index);
        }
        return url;
    }
});

/**
 * Paths
 */
var includePaths = [path.resolve(__dirname, '../../', config.paths)];
var imagePath = [path.resolve(__dirname, '../../', config.dest) + '/'];

var build = lazypipe()
    .pipe(csso)
    .pipe(postcss, [pixrem, url])
    .pipe(rename, {extname: '.min.css'})
    .pipe(gulp.dest, config.dest);

gulp.task('styles', function() {
    return gulp.src(config.src)
        .pipe(sourcemaps.init())
        .pipe(stylus({
            silent: false,
            set: {
                'include css': true
            },
            'include css': true,
            define: {
                '$image-root': config.imgRoot
            },
            paths: includePaths,
            url: {
                name: 'inline-url',
                paths: imagePath,
                limit: false
            }
        }))
        .pipe(sourcemaps.write())
        .on('error', handleErrors)
        .pipe(postcss([
            pixrem,
            autoprefixer
        ]))
        .pipe(gcmq())
        .pipe(gulp.dest(config.dest))
        .pipe(gulpif(options.production, build()));
});