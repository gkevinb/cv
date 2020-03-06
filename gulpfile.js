const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const data = require('gulp-data');
const fs = require('fs');
var argv = require('yargs').argv;

const paths = {
    docs: './docs/',
    dist: {
        all: './dist/',
        html: 'dist/*.html'
    },
    pug: {
        pages: 'src/pages/*.pug',
        pdf : 'src/pdf/*.pug',
        all: 'src/**/*.pug'
    },
    scss: {
        main: 'src/assets/styles/main.scss',
        all: 'src/assets/styles/*.scss'
    },
    data: 'src/assets/data/data.json',
    img: 'src/assets/img/*'
}

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
        baseDir: paths.dist.all
    }
}

function injectJson() {
    return JSON.parse(fs.readFileSync(paths.data))
}

var pugSource = (argv.pug == undefined) ? null : argv.pug;

gulp.task('pages-build', function () {
    return gulp.src(paths.pug.pages)
        .pipe(data(injectJson()))
        .pipe(pug(pugMinifiedOptions))
        .pipe(gulp.dest(paths.docs));
});

gulp.task('pug', function () {
    return gulp.src(paths.pug[pugSource])
        .pipe(data(injectJson()))
        .pipe(pug(pugPrettyOptions))
        .pipe(gulp.dest(paths.dist.all))
        .pipe(browserSync.stream());
});

gulp.task('sass', function () {
    return gulp.src(paths.scss.main)
        .pipe(sass())
        .pipe(gulp.dest(paths.dist.all))
        .pipe(browserSync.stream());
});

gulp.task('image-min', () =>
    gulp.src(paths.img)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.dist.all))
        .pipe(browserSync.stream())
);

gulp.task('sass-build', function () {
    return gulp.src(paths.scss.main)
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.docs))
});

gulp.task('browser-sync', function () {
    browserSync.init(browserSyncOptions);
    gulp.watch(paths.scss.all, gulp.series('sass'));
    gulp.watch(paths.data, gulp.series('pug'));
    gulp.watch(paths.pug.all, gulp.series('pug'));
    gulp.watch(paths.dist.html).on('change', browserSync.reload);
});

gulp.task('build', gulp.series('pages-build', 'sass-build'));
gulp.task('serve', gulp.series('pug', 'sass', 'image-min', 'browser-sync'));