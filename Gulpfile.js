var gulp = require ('gulp'),
    sass = require ('gulp-sass'),
    browserSync = require ('browser-sync'),
    concat = require ('gulp-concat'),
    uglify = require ('gulp-uglifyjs'),
    del = require ('del'),
    imagemin = require ('gulp-imagemin'),
    pngquant = require ('imagemin-pngquant'),
    cache = require ('gulp-cache'),
    autoprefixer = require ('gulp-autoprefixer');

gulp.task('sass', function() {
    gulp.src('./app/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 15 version', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function() {
    return gulp.src(['app/libs/jquery/dist/jquery.min.js'])
        .pipe(concat('libs.min.js'))
        .pipe(uglify('libs.min.js'))
        .pipe(gulp.dest('app/js'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('clean', function() {
    return del.sync('./dist')
});

gulp.task('clear', function() {
    return cache.clearAll();
});

gulp.task('img', function() {
    return gulp.src('./app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false

            }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {
    var buildCss = gulp.src('./app/css/style.css')
        .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('./app/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'));

    var buildJs = gulp.src('./app/js/**/*')
        .pipe(gulp.dest('./dist/js'));

    var buildHtml = gulp.src('./app/**/*.html')
        .pipe(gulp.dest('./dist'));
});


gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function() {
    gulp.watch('./app/sass/**/*.scss', ['sass']);
    gulp.watch('./app/**/*.html', browserSync.reload);
    gulp.watch('./app/js/**/*.js', browserSync.reload);
});