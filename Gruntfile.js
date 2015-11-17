module.export = function(grunt) {

  grunt.initConfig({
    cdnify: {
      options: {
        cdn: require('google-cdn-data')
      },
      dist: {
        html: ['index.html']
      }
    }
  });

  grunt.loadNpmTasks('grunt-google-cdn');

  grunt.registerTask('default', ['cdnify']);

};
