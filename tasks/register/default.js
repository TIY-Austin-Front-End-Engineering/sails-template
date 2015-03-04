module.exports = function (grunt) {
	if(process.env.NODE_ENV.toLowerCase() === 'heroku') {
		grunt.registerTask('default', []);
	}
	else {
		grunt.registerTask('default', ['compileAssets', 'linkAssets',  'watch']);
	}
};
