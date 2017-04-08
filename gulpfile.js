'use strict';

var gulp = require('gulp');
var download = require('gulp-download-stream');
var pkg = require('./package.json');
var zip = require('gulp-zip');
var cssnano = require('gulp-cssnano');
var closureCompiler = require('google-closure-compiler').gulp();
var rename = require('gulp-rename');
var htmlreplace = require('gulp-html-replace');

var name = 'AegisTemplate-v' + pkg.version + '.zip';
var minName = 'AegisTemplate-v' + pkg.version + '.min.zip';

gulp.task('prepare-dev', () => {

	gulp.src('src/index.html')
    .pipe(htmlreplace({
		scripts: {
			src: ['js/artemis.js', 'js/main.js'],
			tpl: '<script src="%s"></script>'
		},
		stylesheets: {
			src: ['style/animate.css', 'style/font-awesome.min.css', 'style/aegis.css', 'style/main.css'],
			tpl: '<link rel="stylesheet" href="%s">'
		}
	}))
    .pipe(gulp.dest('build/'));
});

gulp.task('prepare-prod', () => {

    gulp.src('src/style/animate.min.css')
    .pipe(cssnano())
    .pipe(gulp.dest("src/style/"));

	gulp.src('src/index.html')
    .pipe(htmlreplace({
		scripts: {
			src: ['js/artemis.min.js', 'js/main.js'],
			tpl: '<script src="%s"></script>'
		},
		stylesheets: {
			src: ['style/animate.min.css', 'style/font-awesome.min.css', 'style/aegis.min.css', 'style/main.css'],
			tpl: '<link rel="stylesheet" href="%s">'
		}
	}))
    .pipe(gulp.dest('build/'));
});

gulp.task('build-development', () => {

	return gulp.src(['build/*','src/**', '!src/js/*.min.js', '!src/style/!(font-awesome).min.css', '!**/.DS_Store', '!**/.gitignore', 'build/**', '!src/index.html'], {dot: true})
		.pipe(zip(name))
		.pipe(gulp.dest('dist/'));
});

gulp.task('build-production', () => {

	return gulp.src(['build/*','src/**', '!src/js/!(*.min|main).js', '!src/style/!(*.min|main).css', '!**/.DS_Store', '!**/.gitignore', 'build/**', '!src/index.html'], {dot: true})
		.pipe(zip(minName))
		.pipe(gulp.dest('dist/'));
});

gulp.task('download', () => {

    download("https://raw.githubusercontent.com/AegisFramework/Artemis/master/dist/artemis.js").pipe(gulp.dest("src/js/"));
    download("https://raw.githubusercontent.com/HyuchiaDiego/AegisCSS/master/dist/aegis.css").pipe(gulp.dest("src/style/"));

    download("https://raw.githubusercontent.com/AegisFramework/Artemis/master/dist/artemis.min.js").pipe(gulp.dest("src/js/"));
    download("https://raw.githubusercontent.com/HyuchiaDiego/AegisCSS/master/dist/aegis.min.css").pipe(gulp.dest("src/style/"));

	download("https://raw.githubusercontent.com/daneden/animate.css/master/animate.css").pipe(gulp.dest("src/style/"));
    download({
        file: "animate.min.css",
        url: "https://raw.githubusercontent.com/daneden/animate.css/master/animate.css"
    }).pipe(gulp.dest("src/style/"));

});
