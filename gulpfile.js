// Const Definitions
const GULP = require('gulp');
const SASS = require('gulp-sass');
const BROWSERSYNC = require('browser-sync').create();
const POSTCSS = require('gulp-postcss');
const AUTOPREFIXER = require('autoprefixer');
const CONCAT = require('gulp-concat');
const RENAME = require('gulp-rename');
const UGLIFY = require('gulp-uglify');
const CLEANCSS = require('gulp-clean-css');
const IMAGE = require('gulp-image');

// Default Task
GULP.task('default', ['watch']);

// Process SASS into CSS
GULP.task('scss', ()=>{

	var processor = [
		AUTOPREFIXER({ browsers: ['last 2 versions'] })
	];
	return GULP.src('./src/scss/*.scss')
	.pipe(SASS())
	.pipe(POSTCSS(processor))
	.pipe(GULP.dest('./dist/css'))
	.pipe(CLEANCSS({debug: true}, (details)=>{
		console.log(`${details.name} : ${details.stats.originalSize}`);
		console.log(`${details.name} : ${details.stats.minifiedSize}`);
	}))
	.pipe(RENAME('main.min.css'))
	.pipe(GULP.dest('./dist/css'))
	.pipe(BROWSERSYNC.reload({
		stream: true
	}));

});

// Launch BrowserSync
GULP.task('browser-sync', ()=>{
	BROWSERSYNC.init({
		server: {
			baseDir: './',
			https: true
		}
	});
});

// Concat and Minify Javascript
GULP.task('scripts', ()=>{
	return GULP.src('./src/js/*.js')
	.pipe(CONCAT('scripts.js'))
	.pipe(GULP.dest('./dist/js'))
	.pipe(RENAME('scripts.min.js'))
	.pipe(UGLIFY())
	.pipe(GULP.dest('./dist/js'));
});

GULP.task('image', ()=>{
	GULP.src('./src/img/*.png')
	.pipe(IMAGE())
	.pipe(GULP.dest('./dist/img'))
});

// Watch SCSS for changes
GULP.task('watch', ['scripts', 'browser-sync', 'scss'], function(){
	GULP.watch('./src/scss/**/*.scss', ['scss']);
});
	  