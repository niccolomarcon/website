module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      target: {
        files: {
          'dist/js/index.min.js': 'src/js/index.js'
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'dist/css/index.min.css': 'src/css/index.css'
        }
      }
    },
    processhtml: {
      dist: {
        files: {
          'dist/index.html': 'src/index.html'
        }
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            flatten: true,
            filter: 'isFile',
            src: 'favicon.ico',
            dest: 'dist/'
          },
          {
            expand: true,
            cwd: 'src/',
            flatten: true,
            filter: 'isFile',
            src: 'CNAME',
            dest: 'dist/'
          },
          {
            expand: true,
            cwd: 'src/',
            flatten: true,
            filter: 'isFile',
            src: 'robots.txt',
            dest: 'dist/',
          }
        ]
      },
    },
    'gh-pages': {
      options: {
        base: 'dist'
        // repo: 'https://example.com/other/repo.git'
        // branch: 'branch'
      },
      src: ['**']
    },
    imagemin: {
      static: {
        options: {
          optimizationLevel: 7
        },
        files: {
          // 'dist/media/bg.jpg': 'src/media/bg.jpg'
        }
      }
    },
    xml_sitemap: {
      custom_option: {
        options: {
          dest: 'dist/',
          siteRoot: 'https://niccolomarcon.it /',
          priority: 1.0
        },
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['**/*.html']
          }
        ]
      }
    },
    watch: {
      html: {
        files: 'src/**/*.html',
        tasks: ['newer:processhtml', 'xml_sitemap']
      },
      css: {
        files: 'src/css/**/*.css',
        tasks: ['newer:cssmin']
      },
      js: {
        files: 'src/js/**/*.js',
        tasks: ['newer:uglify']
      },
      img: {
        files: ['scr/media/**/*.gif', 'scr/media/**/*.png', 'scr/media/**/*.jpg', 'scr/media/**/*.jpeg'],
        tasks: ['newer:imagemin:static']
      },
      other_files: {
        files: ['src/favicon.ico', 'src/robots.txt'],
        tasks: ['newer:copy']
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : ['dist/**/*.*']
        },
        options: {
          watchTask: true,
          server: './dist',
          port: 8080,
          ghostMode: true,
          open: 'local'
        }
      }
    },
    cloudflare_purge: {
      default: {
        options: {
          apiKey: process.env.API,
          email: process.env.MAIL,
          zone: "niccolomarcon.it"
        }
      }
    },
    env : {
      dist : {
      src : ".env"
    }
  }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-xml-sitemap');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-env');

  var msg = grunt.option('m') || '';

  grunt.registerTask('default', [
    'uglify',
    'cssmin',
    'processhtml',
    'newer:imagemin:static',
    'copy',
    'xml_sitemap'
  ]);
  grunt.registerTask('deploy', function() {
    grunt.task.run('default');
    if (msg != '') { grunt.config.set('gh-pages.options.message', msg); }
    grunt.task.run('gh-pages');
    grunt.task.run('env:dist');
    grunt.task.run('cloudflare_purge');
  });
  grunt.registerTask('local', ['default', 'browserSync', 'watch']);

};
