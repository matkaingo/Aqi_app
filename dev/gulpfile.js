const {src,dest,series} = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default
const destino = "../www";
const image = require('gulp-image');

sass.compiler = require('dart-sass');

function js(){
	return src("./js/**/*.js")
		.pipe(concat("script.js"))
		.pipe(uglify())
		.pipe(dest(`./${destino}/js/`));
}

function css() {


	return src("./sass/**/.scss")
		.pipe(sass())
		.pipe(cleanCSS())
		.pipe(rename('style.css'))
		.pipe(dest(`./${destino}/css`));
}

function html(){
	return src('./index.html')
	.pipe(dest(`./${destino}`));
}

function images(){
	return src('./img/**/*')
	.pipe(image())
	.pipe(dest(`./${destino}/img`));
}

exports.css = css;
exports.js = js;
exports.release = series(css,js,html,images);
exports.default = ()=>{};