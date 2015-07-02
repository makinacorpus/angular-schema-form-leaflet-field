var
	distMode = (process.argv.slice(2).indexOf('--dist') >= 0),
	src = "./src",
	dest = distMode ? './dist' : './build',
	node_modules = "./node_modules",
	bower_components = "./bower_components";
