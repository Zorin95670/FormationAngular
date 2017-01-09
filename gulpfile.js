var gulp = require('gulp');

gulp.task('angular', function(){
  gulp.src('node_modules/angular/angular.min.js')
    .pipe(gulp.dest('public/libs'));
});
