var gulp         = require('gulp');
var jade         = require('gulp-jade');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').jade;

gulp.task('jade', function() {
  return gulp.src(config.src)
    .pipe(jade({
      pretty: true
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest));
});