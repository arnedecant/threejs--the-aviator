var gulp = require('gulp');
var babel = require('gulp-babel');
// var uglify = require('gulp-uglifyjs');
var browserSync = require('browser-sync').create();

var del = require('del');
var runSequence = require('run-sequence');

gulp.task('js', () => {
    return gulp.src('src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload);
})

gulp.task('html', () => {
    return gulp.src('src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload);
})

gulp.task('browserSync', function () {
    browserSync.init({
        server: "src/index.html",
        port: 9000
    });
});

gulp.task('watch', ['browserSync', 'js'], function () {
	gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('*.html', browserSync.reload);
});

gulp.task('default', function (callback) {
    runSequence(['js', 'browserSync', 'watch'],
        callback
    )
});