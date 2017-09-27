/* global require */

"use strict";

const gulp = require("gulp");
const packageJson = require("./package.json");
const zip = require("gulp-zip");
const download = require("gulp-download-stream");

gulp.task("default", () => {
	return gulp.src([
		"./**",
		"!./**/.DS_Store",
		"!./**/.thumbs",
		"!./**/package-lock.json",
		"!./**/.buildconfig",
		"!node_modules",
		"!node_modules/**",
		"!.git",
		"!.git/**",
		"!build",
		"!build/**",
		"!dist",
		"!dist/**",
	], {
		dot: true
	})
	.pipe(zip(packageJson.name + "-v" + packageJson.version + ".zip"))
	.pipe(gulp.dest("dist"));
});

gulp.task("release", () => {

});

// Update Dependencies
gulp.task("download-deps", () => {

	// Artemis JS
	download("https://raw.githubusercontent.com/AegisFramework/Artemis/master/dist/artemis.js").pipe(gulp.dest("js/"));

	/// Animate CSS
	download({
		file: "animate.min.css",
		url: "https://raw.githubusercontent.com/daneden/animate.css/master/animate.min.css"
	}).pipe(gulp.dest("style/"));

	// Kayros
	download({
		file: "kayros.css",
		url: "https://raw.githubusercontent.com/AegisFramework/Kayros/master/dist/kayros.css"
	}).pipe(gulp.dest("style/"));

	// Font Awesome
	download("https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/css/font-awesome.min.css").pipe(gulp.dest("style/"));

	download({
		file: "FontAwesome.otf",
		url: "https://github.com/FortAwesome/Font-Awesome/blob/master/fonts/FontAwesome.otf?raw=true"
	}).pipe(gulp.dest("fonts/"));

	download({
		file: "fontawesome-webfont.eot",
		url: "https://github.com/FortAwesome/Font-Awesome/blob/master/fonts/fontawesome-webfont.eot?raw=true"
	}).pipe(gulp.dest("fonts/"));

	download({
		file: "fontawesome-webfont.ttf",
		url: "https://github.com/FortAwesome/Font-Awesome/blob/master/fonts/fontawesome-webfont.ttf?raw=true"
	}).pipe(gulp.dest("fonts/"));

	download({
		file: "fontawesome-webfont.woff",
		url: "https://github.com/FortAwesome/Font-Awesome/blob/master/fonts/fontawesome-webfont.woff?raw=true"
	}).pipe(gulp.dest("fonts/"));

	download({
		file: "fontawesome-webfont.woff2",
		url: "https://github.com/FortAwesome/Font-Awesome/blob/master/fonts/fontawesome-webfont.woff2?raw=true"
	}).pipe(gulp.dest("fonts/"));

	download("https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/fonts/fontawesome-webfont.svg").pipe(gulp.dest("fonts/"));
});