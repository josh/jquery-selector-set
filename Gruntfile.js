module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        es3: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noarg: true,
        quotmark: true,
        undef: true,
        unused: true,
        trailing: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      grunt: {
        src: ['Gruntfile.js'],
        options: {
          node: true
        }
      },
      src: {
        src: ['jquery.selector-set.js'],
        options: {
          jquery: true
        }
      },
      test: {
        options: {
          jquery: true,
          globals: {
            'test': false,
            'ok': false,
            'equal': false
          }
        },
        src: ['test/*.js']
      }
    },
    qunit: {
      all: ['test/unpatched/*.html', 'test/patched/*.html']
    },
    connect: {
      server: {
        options: {
          base: '',
          port: 9999
        }
      }
    },
    'saucelabs-qunit': {
      all: {
        options: {
          urls: [
            'http://127.0.0.1:9999/test/unpatched/1-8.html',
            'http://127.0.0.1:9999/test/unpatched/1-9.html',
            'http://127.0.0.1:9999/test/unpatched/1-10.html',
            'http://127.0.0.1:9999/test/unpatched/2-0.html',
            'http://127.0.0.1:9999/test/unpatched/2-1.html',
            'http://127.0.0.1:9999/test/unpatched/bower.html',
            'http://127.0.0.1:9999/test/patched/1-8.html',
            'http://127.0.0.1:9999/test/patched/1-9.html',
            'http://127.0.0.1:9999/test/patched/1-10.html',
            'http://127.0.0.1:9999/test/patched/2-0.html',
            'http://127.0.0.1:9999/test/patched/2-1.html',
            'http://127.0.0.1:9999/test/patched/bower.html'
          ],
          tunnelTimeout: 5,
          build: process.env.TRAVIS_JOB_ID,
          concurrency: 1,
          browsers: [ { browserName: 'chrome' } ]
        }
      }
    },
    watch: {
      grunt: {
        files: ['<%= jshint.grunt.src %>'],
        tasks: ['jshint:grunt']
      },
      src: {
        files: ['<%= jshint.src.src %>'],
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: ['<%= jshint.test.src %>'],
        tasks: ['jshint:test', 'qunit']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-saucelabs');

  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('sauce', ['connect', 'saucelabs-qunit']);
  grunt.registerTask('travis', ['test', 'sauce']);
  grunt.registerTask('default', ['jshint']);
};
