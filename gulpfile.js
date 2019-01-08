var gulp   = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var jsFiles = ['src/_creds.js', 'src/analytics.js', 'src/endpoints/**/*.js'];
var jsDest  = './';

gulp.task('scripts', function() {
    return gulp.src(jsFiles)
        .pipe(concat('analytics.build.js'))
        .pipe(gulp.dest(jsDest));
});
