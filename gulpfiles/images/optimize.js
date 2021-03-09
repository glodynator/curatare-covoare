const { dest, src } = require('gulp');

const { notify, size } = require('../');

const imagemin = require('gulp-imagemin');

const IMAGEMIN_OPTIONS = [
	imagemin.svgo({
		plugins: [
			{ removeViewBox: false },
		],
	}),
];

const SRC_OPTIONS = {};

const DEST_OPTIONS = {};

function optimize(sourceFiles, destinationDirectory, { imageminOptions = IMAGEMIN_OPTIONS, srcOptions = SRC_OPTIONS, destOptions = DEST_OPTIONS } = {}) {
	return src(sourceFiles, srcOptions)

		.pipe(imagemin(imageminOptions))

		.pipe(size({ showFiles: true, title: 'Media Optimized --->' })) // size before dest results in better output in the console
		.pipe(dest(destinationDirectory, destOptions))
		.pipe(notify({ message: 'Media optimized', onLast: true }));
}
optimize.description = 'Optimize Media files';
optimize.defaults = {
	IMAGEMIN_OPTIONS,
	SRC_OPTIONS,
	DEST_OPTIONS,
};

module.exports = optimize;
