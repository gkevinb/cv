const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
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
        pages: 'src/assets/styles/main-pages.scss',
        pdf: 'src/assets/styles/main-pdf.scss',
        all: 'src/assets/styles/*.scss'
    },
    data: 'src/assets/data/data.json',
    img: 'src/assets/img/*',
    export: 'export/GaborKevinBartaCV.pdf'
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
        baseDir: paths.dist.all,
    },
    notify: false
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
    return gulp.src(paths.scss[pugSource])
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

gulp.task('image-min-build', () =>
    gulp.src(paths.img)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.docs))
);

gulp.task('move-export-pdf', () =>
    gulp.src(paths.export)
        .pipe(gulp.dest(paths.docs))
);

gulp.task('sass-build', function () {
    return gulp.src(paths.scss.pages)
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 99 versions'],
            cascade: false
        }))
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

gulp.task('build', gulp.series('pages-build', 'sass-build', 'image-min-build', 'move-export-pdf'));
gulp.task('serve', gulp.series('pug', 'sass', 'image-min', 'browser-sync'));

gulp.task('pdf-puppeteer', async function(){
    const puppeteer = require('puppeteer');
    (async () => {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle2'})
        await page.pdf(
            {
                path: 'export/GaborKevinBartaCV.pdf',
                format: 'A4'
            }
        )
        await browser.close()
    })()
});