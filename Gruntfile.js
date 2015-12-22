module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      my_target: {
        files: {
          'js/main.min.js': 'src/js/main.js'
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'css/main.min.css': 'src/css/main.css'
        }
      }
    },
    minjson: {
      compile: {
        files: {
          'js/quotes.min.json': 'src/js/quotes.json'
        }
      }
    },
    watch: {
      scripts: {
        files: ['src/*/*.*'],
        tasks: ['default']
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-minjson');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['uglify', 'cssmin', 'minjson']);

};
