module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        mangle: true,
        sourceMap: false,
        preserveComments: 'some',
      },
      dynamic_mappings: {
        files: [{
          src: 'extractjs.js',
          dest: 'extractjs.min.js',
        }, ],
      },
    },

    jshint: {
      all: ['extractjs.js'],
      options: {
        multistr: true
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
        },
        src: ['test/test.js']
      }
    }    
  });

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify', 'mochaTest']);

};
