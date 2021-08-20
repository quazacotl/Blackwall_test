const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-dart-sass');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');



const dist = "./dist/";


gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: dist,
            index: "index.html"
        },
        ui: {
            port: 4000
        }
    });
});

gulp.task('html', function () {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest(dist));
});



gulp.task('sass', function() {
    return gulp.src(`./src/sass/**/*.+(scss|sass)`)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
        }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(dist + `/css/`))
        .pipe(browserSync.stream());
});



gulp.task('watch', function () {
    gulp.watch("./src/sass/**/*.+(scss|sass|css)", gulp.parallel('sass'));
    gulp.watch("./src/*.html").on("change", browserSync.reload);
    gulp.watch("./src/*.html").on("change", gulp.parallel('html'));
});


gulp.task('font', function () {
    return gulp.src('./src/font/**/*')
        .pipe(gulp.dest(dist + '/font'));
});

gulp.task('icons', function () {
    return gulp.src('./src/icon/*')
        .pipe(gulp.dest(dist + '/icon'));
});

gulp.task('images', function () {
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest(dist + '/img'));
});



gulp.task('default', gulp.parallel('server', 'watch', 'html', 'sass', 'font', 'icons', 'images'));