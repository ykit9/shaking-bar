"use strict";

var gulp = require('gulp'),
	concatCSS = require('gulp-concat'),
	rename = require('gulp-rename'),	
	watch = require('gulp-watch'),
	htmlmin = require('gulp-htmlmin'),
  	minify = require('gulp-minify'),
	cssmin = require('gulp-cssmin'),
  	connect = require('gulp-connect'),
  	ngrok = require('ngrok');

var site      = '';
var portVal   = 3000;

gulp.task('ngrok-url', function(cb) {
  return ngrok.connect(portVal, function (err, url) {
    site = url;
    console.log('serving your tunnel from: ' + site);
    cb();
  });
});

//css watch concat prefix min
gulp.task('css', function() {
  gulp.src('src/css/*.css')
  	.pipe(cssmin())
    .pipe(rename('main.min.css'))
  	.pipe(gulp.dest('app/css/'))
    .pipe(connect.reload());
});

//html minifying
gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('app/'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    port: portVal,
    root: 'app',
    livereload: true //with LiveReload!
  });
});


gulp.task('build', ['css','html']);

gulp.task('watch', function() {
	gulp.watch('src/css/*.css', ['css'])
	gulp.watch('src/index.html',['html'])

});


gulp.task('default',['connect','build','watch']);