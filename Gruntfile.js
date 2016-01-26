module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      target: {
        files: {
          'dist/js/main.min.js': 'js/main.js'
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'dist/css/main.min.css': ['css/main.css', 'css/print.css']
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
    },
    copy: {
      main: {
        src: 'favicon.ico',
        dest: 'dist/',
      },
    },
    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**']
    },
    shell: {
      dep: {
        command: 'rm -rf ~/Sites/dist && mv dist ~/Sites'
      }
    },
    imagemin: {
      static: {
        options: {
          optimizationLevel: 7
        },
        files: {
          'dist/media/bg.jpg': 'media/bg.jpg',
          'dist/media/og.png': 'media/og.png'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-minjson');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');

  var msg = grunt.option('m') || '';

  grunt.registerTask('default', [
    'uglify',
    'cssmin',
    'minjson',
    'processhtml',
    'newer:imagemin:static',
    'copy'
  ]);
  grunt.registerTask('deploy', function() {
    grunt.task.run('default');
    if (msg != '') { grunt.config.set('gh-pages.options.message', msg); }
    grunt.task.run('gh-pages');
  });
  grunt.registerTask('local', ['default', 'shell:dep']);

};
