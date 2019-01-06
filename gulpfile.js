var gulp   = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var jsFiles = 'src/**/*.js';
var jsDest  = './';

gulp.task('scripts', function() {
    return gulp.src(jsFiles)
        .pipe(concat('analytics.js'))
        .pipe(gulp.dest(jsDest));
});
