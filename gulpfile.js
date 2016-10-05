var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var minify = require('gulp-minify');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var ejs = require('gulp-ejs');

gulp.task('html', () => {
	gulp.src('src/html/**/*.ejs')
		.pipe(ejs({}, {ext:'.html'}))
		.pipe(htmlmin({
			collapseWhitespace: true,
			minifyCSS: true,
			minifyJS: true,
			removeComments: true
		}))
		.pipe(gulp.dest('build/'))
		.pipe(connect.reload());
});

gulp.task('js', () => {
	gulp.src('src/js/**/*.js')
		.pipe(minify({
        ext:{
            src:'.js',
            min:'.js'
        },
        ignoreFiles: ['-min.js']
    }))
		.pipe(gulp.dest('build/js'));
});

gulp.task('css', () => {
	gulp.src('src/css/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('build/css'));
});

gulp.task('bower', () => {
	gulp.src('src/bower_components/**/*')
		.pipe(gulp.dest('build/bower_components'));
});

gulp.task('img', () => {
	gulp.src('src/img/**/*')
		.pipe(gulp.dest('build/img'));
});

gulp.task('connect', function() {
  connect.server({
		root: 'build',
    livereload: true
	});
});

gulp.task('watch', () => {
		var watcher = gulp.watch('src/**', ['html', 'js', 'css', 'bower', 'img']);
		watcher.on('change', (event) => {
			console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		});
});

gulp.task('default', ['html', 'js', 'css', 'bower', 'img', 'connect', 'watch']);
