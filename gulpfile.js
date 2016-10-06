var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var minify = require('gulp-minify');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var ejs = require('gulp-ejs');

gulp.task('html_home', () => {
	gulp.src('src/html/**/index.ejs')
		.pipe(ejs({page: 'Home'}, {ext:'.html'}))
		.pipe(htmlmin({
			collapseWhitespace: true,
			minifyCSS: true,
			minifyJS: true,
			removeComments: true
		}))
		.pipe(gulp.dest('build/'));
});

gulp.task('html_hardware', () => {
	gulp.src('src/html/**/hardware.ejs')
		.pipe(ejs({page: 'Hardware'}, {ext:'.html'}))
		.pipe(htmlmin({
			collapseWhitespace: true,
			minifyCSS: true,
			minifyJS: true,
			removeComments: true
		}))
		.pipe(gulp.dest('build/'));
});

gulp.task('html_software', () => {
	gulp.src('src/html/**/software.ejs')
		.pipe(ejs({page: 'Software'}, {ext:'.html'}))
		.pipe(htmlmin({
			collapseWhitespace: true,
			minifyCSS: true,
			minifyJS: true,
			removeComments: true
		}))
		.pipe(gulp.dest('build/'));
});

gulp.task('html_framework', () => {
	gulp.src('src/html/**/framework.ejs')
		.pipe(ejs({page: 'Framework'}, {ext:'.html'}))
		.pipe(htmlmin({
			collapseWhitespace: true,
			minifyCSS: true,
			minifyJS: true,
			removeComments: true
		}))
		.pipe(gulp.dest('build/'));
});

gulp.task('html_report', () => {
	gulp.src('src/html/**/report.ejs')
		.pipe(ejs({page: 'Report'}, {ext:'.html'}))
		.pipe(htmlmin({
			collapseWhitespace: true,
			minifyCSS: true,
			minifyJS: true,
			removeComments: true
		}))
		.pipe(gulp.dest('build/'));
});

gulp.task('html', ['html_home', 'html_hardware', 'html_software', 'html_framework', 'html_report']);

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
		.pipe(sass({}).on('error', sass.logError))
		.pipe(gulp.dest('build/css'));
});

gulp.task('bower', () => {
	gulp.src('src/bower_components/**/*')
		.pipe(gulp.dest('build/bower_components'))
		.pipe(connect.reload());
});

gulp.task('img', () => {
	gulp.src('src/img/**/*')
		.pipe(gulp.dest('build/img'));
});
gulp.task('pdf', () => {
	gulp.src('src/pdf/**/*')
		.pipe(gulp.dest('build/pdf'));
});

gulp.task('connect', function() {
  connect.server({
		root: 'build',
    livereload: true
	});
});

gulp.task('watch', () => {
		var watcher = gulp.watch(['src/**/*.ejs', 'src/**/*.scss', 'src/**/*.js'], ['html', 'js', 'css', 'img', 'pdf', 'bower']);
		watcher.on('change', (event) => {
			console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		});
});

gulp.task('default', ['html', 'js', 'css', 'img', 'pdf', 'bower', 'connect', 'watch']);
