module.exports = function(grunt) {
  grunt.config.set('bower', {
    dev: {
        dest: '.tmp/public',
        js_dest: '.tmp/public/js'
    }
  });

  grunt.loadNpmTasks('grunt-bower');

};
