module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/script.js', 'src/**/*.js', '<%= ngtemplates.app.dest %>'],
        dest: 'js/spark.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'js/spark.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js'],
    },
    ngtemplates:    {
      app:          {
        cwd:        'src/',
        src:        '**/*.html',
        dest:       'js/templates.js',
        options:    {
            module:     'leaguespark',
            htmlmin: {
              collapseBooleanAttributes:      true,
              collapseWhitespace:             true,
              removeAttributeQuotes:          true,
              removeComments:                 true, // Only if you don't use comment directives!
              removeEmptyAttributes:          true,
              removeRedundantAttributes:      true,
              removeScriptTypeAttributes:     true,
              removeStyleLinkTypeAttributes:  true
            }
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-angular-templates');

  grunt.registerTask('default', ['jshint', 'ngtemplates', 'concat', 'uglify']);

};