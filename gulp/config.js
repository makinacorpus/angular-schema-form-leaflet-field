var
	distMode = (process.argv.slice(2).indexOf('--dist') >= 0),
	src = "./src",
	dest = distMode ? './dist' : './build',
	node_modules = "./node_modules",
	bower_components = "./bower_components";

module.exports = {
	compressJs: {
		src: src + "/*.js",
		dest: dest,
		opts: {}
	},
	compressHtml: {
		src: src + "/*.html",
		dest: dest,
		opts: {
			conditionals: true,
			spare:true
		}
	}
};
