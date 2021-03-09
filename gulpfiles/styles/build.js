const { dest, src } = require('gulp');

const { newer, notify, prettyError, size } = require('../');

const autoprefixer = require('autoprefixer');	// https://www.npmjs.com/package/autoprefixer
const postcss = require('gulp-postcss');		// https://github.com/postcss/gulp-postcss
const sass = require('gulp-sass');				// https://www.npmjs.com/package/gulp-sass
const sassGlob = require('gulp-sass-glob');		// https://www.npmjs.com/package/gulp-sass-glob

const SRC_OPTIONS = {
	sourcemaps: true
};

const DEST_OPTIONS = {
	sourcemaps: '.'
};

const SASS_OPTIONS = {
	style: 'expanded',
	includePaths: ['./'],
};

function build(sourceFiles, destinationDirectory, { srcOptions = SRC_OPTIONS, destOptions = DEST_OPTIONS, sassOptions = SASS_OPTIONS } = {}) {
	return src(sourceFiles, srcOptions) // gulp 4 sourcemaps: https://fettblog.eu/gulp-4-sourcemaps/
		.pipe(prettyError())

		.pipe(newer({
			dest: destinationDirectory,
			ext: '.css',
			extra: sourceFiles,
		}))

		.pipe(sassGlob())
		.pipe(sass(sassOptions))
		.pipe(postcss([
			autoprefixer(), // browserconfig in .browserslistrc
		]))

		.pipe(size({ showFiles: true, title: 'CSS Generated --->' })) // size before dest results in better output in the console
		.pipe(dest(destinationDirectory, destOptions))
		.pipe(notify({ message: 'CSS compilation complete', onLast: true }));
};
build.description = 'Compile CSS from SCSS';
build.defaults = {
	DEST_OPTIONS,
	SASS_OPTIONS,
	SRC_OPTIONS,
};

module.exports = build;
