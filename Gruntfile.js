module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      my_target: {
        files: {
          'dist/js/main.min.js': 'js/main.js'
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'dist/css/main.min.css': 'css/main.css'
        }
      }
    },
    minjson: {
      compile: {
        files: {
          'dist/js/quotes.json': 'js/quotes.json'
        }
      }
    },
    processhtml: {
      dist: {
        files: {
          'dist/index.html': 'index.html'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-minjson');
  grunt.loadNpmTasks('grunt-processhtml');

  grunt.registerTask('default', ['uglify', 'cssmin', 'minjson', 'processhtml']);

};
