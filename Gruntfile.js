module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/script.js', 'src/**/*.js', '<%= ngtemplates.app.dest %>'],
        dest: 'dist/spark.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/spark.min.js': ['<%= concat.dist.dest %>']
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
        dest:       'dist/templates.js',
        options:    {
            module:     'leaguespark',
            htmlmin: {
              collapseBooleanAttributes:      true,
              collapseWhitespace:             true,
              removeAttributeQuotes:          true,
              removeComments:                 true,
              removeEmptyAttributes:          true,
              removeRedundantAttributes:      true,
              removeScriptTypeAttributes:     true,
              removeStyleLinkTypeAttributes:  true
            }
        }
      }
    },
    copy: {
      public: {
        files: [
          { src:"dist/index.html", dest:"public/index.html" },
         // { src:"dist/style.css", dest:"public/style.css" },
          { src:"dist/spark.min.js", dest:"public/script.js" }
        ]
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },
    htmlmin: {
        dist: {
            options: {
                collapseBooleanAttributes:      true,
                collapseWhitespace:             true,
                removeAttributeQuotes:          true,
                removeComments:                 true,
                removeEmptyAttributes:          true,
                removeRedundantAttributes:      true,
                removeScriptTypeAttributes:     true,
                removeStyleLinkTypeAttributes:  true
          },
          files: {
            'dist/index.html': 'src/index.html',
         }
      },
    },
    clean: ['dist']
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['jshint', 'ngtemplates', 'concat', 'uglify', 'htmlmin', 'copy', 'clean']);

};