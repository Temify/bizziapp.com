var gulp = require('gulp');
var pug = require('gulp-pug');
var handleErrors = require('../util/handleErrors');
var config = require('../config').jade;
var data = require('gulp-data');
var fs = require('fs');

gulp.task('jade', function () {
	return gulp.src(config.src)
		.pipe(data(function (file) {
			return JSON.parse(fs.readFileSync('src/frontend/text.json'))
		}))
		.pipe(pug({
			pretty: true
		}))
		.on('error', handleErrors)
		.pipe(gulp.dest(config.dest));
});