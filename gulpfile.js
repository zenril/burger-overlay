var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src(['./app/sass/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/static/css'));
});
 
gulp.task('watch', function () {
  gulp.watch('./app/sass/**/*.scss', ['sass']);
});