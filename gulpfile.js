var gulp = require('gulp');
var del = require('del');
var browsersync = require('browser-sync').create();
var reload = browsersync.reload;
var sass = require('gulp-sass');
var min_css = require('gulp-minify-css');
var rename = require('gulp-rename');
/**
 * 监听文件变化并刷新浏览器
 */
gulp.task('watch', function () {
    browsersync.init({
        server: {
            baseDir: "."
        }
    });
    gulp.watch("src/**/*.scss", ['sassfile']).on('change', reload);
    gulp.watch("src/excamp/*.html").on('change', reload);
});
/**
 * 将sass转化为css
 */
gulp.task('sassfile', function () {
    return gulp.src('./src/emui.scss')
        .pipe(sass())
        .pipe(min_css())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist'));
});

/**
 * 打包压缩的css
 */
gulp.task('build', function () {
    return gulp.src('./index.scss')
        .pipe(sass())
        .pipe(min_css())
        .pipe(rename('emui.min.css'))
        .pipe(gulp.dest('./dist'));
})
