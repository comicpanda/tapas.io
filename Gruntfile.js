module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: {
      css: 'css',
      js: 'js'
    },

    dests: {
      css: 'public/css',
      js: 'public/js'
    },

    jshint: {
      files: ['Gruntfile.js', '<%= dirs.js %>/tapas.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },

    concat: {
      options: {},
      js: {
        src: ['js/jquery.min.js',
        'js/jquery.mobile.min.js',
        'js/jquery-effect.min.js',
        'js/tether.min.js',
        'js/bootstrap.min.js',
        'build/tapas.min.js'],
        dest: 'public/js/tapas.min.js'
      },
      css: {
        src: ['css/bootstrap.min.css','build/style.css'],
        dest: 'public/css/style.min.css'
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'build/style.css': 'css/sass/style.scss'
        }
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {'build/tapas.min.js': ['js/tapas.js']}
      }
    },

    sprite: {
      asset: {
        src: 'images/sprite/*.png',
        retinaSrcFilter: 'images/sprite/*-2x.png',
        dest: 'public/images/sprites.png',
        retinaDest : 'public/images/sprites-2x.png',
        destCss: 'css/sass/sprites.scss',
        imgPath: '/public/images/sprites.png',
        retinaImgPath: '/public/images/sprites-2x.png',
        cssSpritesheetName: 'sp',
        cssRetinaGroupsName: 'sp-retina-groups',
        cssRetinaSpritesheetName: 'sp-retina',
        padding : 2,
        cssVarMap : function(sprite) {
          sprite.name = 'sp-' + sprite.name;
        },
        cssOpts: {functions: false}
      },

      team: {
        src: 'images/sprite-team/*.png',
        retinaSrcFilter: 'images/sprite-team/*-2x.png',
        dest: 'public/images/sprites-team.png',
        retinaDest : 'public/images/sprites-team-2x.png',
        destCss: 'css/sass/sprites-team.scss',
        imgPath: '/public/images/sprites-team.png',
        retinaImgPath: '/public/images/sprites-team-2x.png',
        cssSpritesheetName: 'sp-team',
        cssRetinaGroupsName: 'sp-team-retina-groups',
        cssRetinaSpritesheetName: 'sp-team-retina',
        padding : 2,
        cssVarMap : function(sprite) {
          sprite.name = 'sp-team-' + sprite.name;
        },
        cssOpts: {functions: false}
      },
    },

    clean: ['build/**', 'public/**'],

    copy: {
      main: {
        expand: true,
        src: ['images/*.png','images/*.ico'],
        dest: 'public/'
      }
    },
    
    watch: {
      sass : {
        files: ['css/sass/*.scss', 'js/tapas.js'],
        tasks: ['sass', 'concat:css','jshint','uglify', 'concat:js']
      },
      livereload : {
        options: {livereload: true},
        files: ['public/css/style.min.css']
      }
    }
  });

  // These plugins provide necessary tasks.
  for (var key in grunt.file.readJSON('package.json').devDependencies) {
    if (key !== 'grunt' && key.indexOf('grunt') === 0) { grunt.loadNpmTasks(key); }
  }
  //processhtml
  grunt.registerTask('default', ['clean','copy','jshint','uglify','concat:js','sprite','sass','concat:css']);
};
