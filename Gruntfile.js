module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    dirs: {
      css: 'css',
      js: 'js/tapas'
    },

    dests: {
      js: 'public/js'
    },

    bootstrapCss: '<%= dirs.css %>/bootstrap.min.css',

    jshint: {
      files: ['Gruntfile.js', '<%= dirs.js %>/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },

    concat: {
      options: {},
      js: {
        files: {}
      },
      css: {
        files: {

        }
      }
    },

    compass: {
      tapas: {
        options : {
          sassDir: '<%= dirs.css %>/sass',
          cssDir: '<%= dirs.css %>',
          outputStyle: 'compressed'
        }
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'public/js/',
        dest: 'public/js/'
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['jshint', 'compass', 'concat', 'uglify']);
};