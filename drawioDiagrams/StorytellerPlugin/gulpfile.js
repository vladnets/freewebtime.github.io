var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('createPlugin', function() {
  return gulp.src([
      './sources/storyteller.core.js',
      './sources/drawio.plugin.core.js',
    ])
   .pipe(concat('storyteller.js'))
   .pipe(gulp.dest('./content/js/'));
});

gulp.task('createStoryteller', function() {
  return gulp.src([
      './sources/storyteller.core.js',
    ])
   .pipe(concat('storyteller.core.js'))
   .pipe(gulp.dest('./content/js/'));
});

gulp.task('scripts', ['createPlugin', 'createStoryteller']);

gulp.task('watch', function() {
  gulp.watch('./sources/**/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);