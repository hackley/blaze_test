var liveReload = require('connect-livereload');
var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};


module.exports = function(grunt) {

  // Load all plugins named with the "grunt-" prefix
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    watch: {
      sass: {
        files: ['lib/stylesheets/**/*.scss'],
        tasks: ['sass:server']
      },
      js: {
        files: ['lib/javascripts/**/*.js'],
        tasks: ['concat:server']
      },
      reload: {
        files: [
          '.tmp/**/*.css',
          '.tmp/**/*.js',
          'lib/**/*.html',
          'lib/**/*.{js,jpg,png,gif,svg}'
        ],
        options: {
          livereload: true
        }
      }
    },

    connect: {
      options: {
        port: 9000,
        hostname: '0.0.0.0'
      },
      server: {
        options: {
          middleware: function(connect) {
            return [
              liveReload(),
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'lib')
            ];
          }
        }
      },
    },

    sass: {
     options: {
        style: 'expanded',
        precision: 15
      },
      server: {
        files: {
          '.tmp/styles.css': [
            'lib/stylesheets/styles.scss'
          ]
        }
      }
    },

    concat: {
      server: {
        files: {
          '.tmp/app.js': [
            'bower_components/blaze/blaze.js',
            'bower_components/underscore/underscore.js',
            'lib/javascripts/**/*.js'
          ],
        },
      }
    },
  });


  grunt.registerTask('server', function(target) {
    grunt.task.run([
      'sass:server',
      'concat:server',
      'connect',
      'watch'
    ]);
  });

  grunt.registerTask('default', 'server');

}
