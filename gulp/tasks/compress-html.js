var gulp = require("gulp");
var minifyHTML = require('gulp-minify-html');

var config = require("../config").compressHtml;

gulp.task("compress-html", [], function() {
	return gulp
		.src(config.src)
		.pipe(minifyHTML(config.opts))
		.pipe(gulp.dest(config.dest));
});
