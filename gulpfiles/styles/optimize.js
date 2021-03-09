const { dest, src } = require('gulp');

const { newer, notify, rename, sourcemaps, size } = require('../');

const cssnano = require('cssnano');			// https://www.npmjs.com/package/cssnano
const postcss = require('gulp-postcss');	// https://github.com/postcss/gulp-postcss

const CSSNANO_OPTIONS = {
	reduceIdents: false,
	minifyFontValues: false,
	discardComments: true,
	colormin: {},
};

const SRC_OPTIONS = {
	sourcemaps: true
};

const DEST_OPTIONS = {
	sourcemaps: '.'
};

function optimize(sourceFiles, destinationDirectory, { cssnanoOptions = CSSNANO_OPTIONS, srcOptions = SRC_OPTIONS, destOptions = DEST_OPTIONS } = {}) {
	return src(sourceFiles, srcOptions)
		.pipe(newer({
			dest: destinationDirectory,
			ext: '.css',
			extra: sourceFiles,
		}))

		// .pipe(sourcemaps.init())

		.pipe(postcss([
			cssnano(cssnanoOptions),
		]))
		// .pipe(rename({
		// 	suffix: '.min',
		// }))

		// .pipe(sourcemaps.write('/'))

		.pipe(size({ showFiles: true, title: 'CSS Optimized --->' })) // size before dest results in better output in the console
		.pipe(dest(destinationDirectory, destOptions))
		.pipe(notify({ message: 'CSS optimization complete', onLast: true }));
}
optimize.description = 'Minimize CSS';
optimize.defaults = {
	CSSNANO_OPTIONS,
	SRC_OPTIONS,
	DEST_OPTIONS,
};

module.exports = optimize;
