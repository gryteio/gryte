var FS = require('fs');
var PATH = require('path');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var gulp = require('gulp');
var util = require('gulp-util');
var marked = require('gulp-marked');
var wrap = require('gulp-wrap');
var frontMatter = require('gulp-front-matter');
var data = require('gulp-data');

gulp.task('build:docs', function () {
    var collection = {};
    var rendrer = {
        render: {
            heading: function (text, level) {
                var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
                return '<h' + level + ' class="kb-headline">' + text + '</h' + level + '>';
              },
              code: function (code, language) {
                var coded = require('highlightjs').highlightAuto(code).value;
                var button = '<button class="kb-show-btn">Toggle code</button>';
                return '<div class="kb-pre-container">' + button + '<pre><code class="hljs ' + language + '">' + coded + '</code></pre></div>';
              }
        },
        langPrefix: 'hljs '
    };
  
    return Promise.all([
      new Promise(function (resolve, reject) {
        // Move assets from 07-docs to destination
        resolve();
      }),
      new Promise(function (resolve, reject) {
        // Handle SCSS inside 07-docs
        resolve();
      }),
      new Promise(function (resolve, reject) {
        // Handle JS inside 07-docs
        resolve();
      }),
      new Promise(function (resolve, reject) {
        gulp.src(['./source/**/*.md', '!node_modules/**'])
          .on('error', reject)
          .pipe(frontMatter())
          .pipe(marked(rendrer))
          .pipe(data(function (file) {
            var data = file.frontMatter;
            if (data.name && data.area) {
              data.path = file.history[1].replace(file.base, "");
              if(data.title == null) {
                data.title = data.name;
              }
              if (collection[data.area] == null) {
                collection[data.area] = { 'name': data.area };
                collection[data.area].children = [];
              }
              collection[data.area].children.push(data);
            }
            return file;
          }))
          .pipe(wrap({ src: './source/07-docs/template.tpl' }))
          .pipe(gulp.dest('./dist/src/'))
          .on('end', resolve);
      })
    ]).then(function () {
        FS.writeFileSync('./dist/collection.json', JSON.stringify(collection));
    }).catch(function(error) {
        util.log(util.colors.red(error.message));
        util.beep();
        this.emit('end');
    });
  });
  
  gulp.task('watch:docs', function () {
    gulp.watch(['./source/07-docs/*.*', './source/**/*.md', '!node_modules/**'], ['build:docs']);
  });
  