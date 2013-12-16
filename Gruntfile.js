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
        files: ['<%= jshint.test.src %>', 'test/*.html'],
        tasks: ['jshint:test', 'qunit']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('default', ['jshint']);
};
