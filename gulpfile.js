const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

gulp.task('pug', function () {
    return gulp.src('src/*.pug')
        .pipe(pug({
            doctype: 'html',
            pretty: true
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function(){
    return gulp.src('src/main.scss')
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

// Static server
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });

    // Make broswer sync on change in SASS and CSS
    gulp.watch("src/*.scss", gulp.series('sass'));
    gulp.watch("src/*.pug", gulp.series('pug'));
    gulp.watch("dist/*.html").on('change', browserSync.reload);
    // gulp.watch("src/js/*.js").on('change', browserSync.reload);
});