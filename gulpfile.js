const { src, dest, parallel, series } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
var del = require('del');
var vinylPaths = require('vinyl-paths');
const htmlmin = require('gulp-htmlmin');

function clearBuildFile() {
	return src('dist/*')
		.pipe(dest('dist'))
		.pipe(vinylPaths(del));
}

function html() {
	return src('src/templates/*.html')
		.pipe(htmlmin({ removeComments: true, collapseWhitespace: true, minifyJS: true, minifyCSS: true }))
		.pipe(dest('dist/html'))
}

function javascript() {
	return src('src/js/*.js')
		.pipe(babel())
		.pipe(uglify())
		.pipe(rename({
			dirname: "static/js",
			suffix: ".min",
			extname: ".js"
		}))
		.pipe(dest('./dist'));
}

exports.default = series(clearBuildFile, parallel(html, javascript));