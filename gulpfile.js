const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const data = require('gulp-data');
const fs = require('fs');


const pugPrettyOptions = {
    doctype: 'html',
    pretty: true
}

const pugMinifiedOptions = {
    doctype: 'html',
    pretty: false
}

const browserSyncOptions = {
    server: {
        baseDir: './dist/'
    }
}

function injectJson() {
    return JSON.parse(fs.readFileSync('src/assets/data.json'))
} 

gulp.task('show-args', async function() {
    console.log(process.argv);
    console.log(process.argv[3]);
});

gulp.task('build', function() {
    return gulp.src('/templates/**/*.pug')
        .pipe(data(injectJson()))
        .pipe(pug())
        .pipe(gulp.dest('/dist'));
});

gulp.task('pug-pages', function () {
    return gulp.src('src/pages/*.pug')
        .pipe(data(injectJson()))
        .pipe(pug(pugPrettyOptions))
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream());
});

gulp.task('pug-pages-build', function () {
    return gulp.src('src/pages/*.pug')
        .pipe(data(injectJson()))
        .pipe(pug(pugMinifiedOptions))
        .pipe(gulp.dest('./docs/'));
});

gulp.task('pug-pdf', function () {
    return gulp.src('src/pdf/*.pug')
        .pipe(data(injectJson()))
        .pipe(pug(pugPrettyOptions))
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream());
});

gulp.task('sass', function(){
    return gulp.src('src/assets/styles/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

gulp.task('sass-build', function(){
    return gulp.src('src/assets/styles/main.scss')
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(gulp.dest('docs/'))
});

// Static server
gulp.task('browser-sync-pages', function () {
    browserSync.init(browserSyncOptions);
    gulp.watch('src/assets/styles/*.scss', gulp.series('sass'));
    gulp.watch('src/assets/data.json', gulp.series('pug-pages'));
    gulp.watch('src/**/*.pug', gulp.series('pug-pages'));
    gulp.watch('dist/*.html').on('change', browserSync.reload);
});

gulp.task('browser-sync-pdf', function () {
    browserSync.init(browserSyncOptions);
    gulp.watch('src/assets/styles/*.scss', gulp.series('sass'));
    gulp.watch('src/assets/data.json', gulp.series('pug-pdf'));
    gulp.watch('src/**/*.pug', gulp.series('pug-pdf'));
    gulp.watch('dist/*.html').on('change', browserSync.reload);
});


gulp.task('build', gulp.series('pug-pages-build', 'sass-build'));
gulp.task('serve-pages', gulp.series('pug-pages', 'sass', 'browser-sync-pages'));
gulp.task('serve-pdf', gulp.series('pug-pdf', 'sass', 'browser-sync-pdf'));