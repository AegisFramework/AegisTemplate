'use strict';

var gulp = require('gulp');
var download = require('gulp-download-stream');
var pkg = require('./package.json');
var zip = require('gulp-zip');
var cssnano = require('gulp-cssnano');
var closureCompiler = require('google-closure-compiler').gulp();
var rename = require('gulp-rename');

var name = 'AegisTemplate-v' + pkg.version + '.zip';

gulp.task('default', () => {

    gulp.src('src/style/animate.min.css')
    .pipe(cssnano())
    .pipe(gulp.dest("src/style/"));

	return gulp.src('src/**', {dot: true})
		.pipe(zip(name))
		.pipe(gulp.dest('dist/'));
});

gulp.task('download', () => {

    download("https://raw.githubusercontent.com/HyuchiaDiego/AegisJS/master/dist/aegis.js").pipe(gulp.dest("src/js/"));
    download("https://raw.githubusercontent.com/HyuchiaDiego/AegisCSS/master/dist/aegis.css").pipe(gulp.dest("src/style/"));

    download({
        file: "animate.min.css",
        url: "https://raw.githubusercontent.com/daneden/animate.css/master/animate.css"
    }).pipe(gulp.dest("src/style/"));

});
