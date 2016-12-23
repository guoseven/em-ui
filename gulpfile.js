var gulp = require('gulp');
var del = require('del');
var browsersync = require('browser-sync').create();
var reload = browsersync.reload;
var sass = require('gulp-sass');
var min_css = require('gulp-minify-css');
var rename = require('gulp-rename');
var bump = require('gulp-bump')
/**
 * 监听文件变化并刷新浏览器
 */
gulp.task('watch', function () {
    browsersync.init({
        server: {
            baseDir: "."
        }
    });
    gulp.watch("src/*/*/*.scss", ['sassfile']).on('change', reload);
    gulp.watch("src/example/*.html").on('change', reload);
});
/**
 * 自动更新版本号
 */
gulp.task('bump', function () {

    gulp.src('./package.json')

        .pipe(bump())

        .pipe(gulp.dest('./'));

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
