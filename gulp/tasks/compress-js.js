var gulp = require("gulp");
var uglify = require('gulp-uglify');

var config = require("../config").compressJs;

gulp.task("compress-js", [], function() {
	return gulp
		.src(config.src)
		.pipe(uglify(config.opts))
		.pipe(gulp.dest(config.dest));
});
