const { dest, src } = require('gulp');

const { notify, size } = require('../');

const extReplace = require('gulp-ext-replace');
const imagemin = require('gulp-imagemin');
const imageminWebp = require('imagemin-webp');

const IMAGEMIN_WEBP_OPTIONS = {
	quality: 100,
};

const SRC_OPTIONS = {};

const DEST_OPTIONS = {};

function webp(sourceFiles, destinationDirectory, { imageminWebpOptions = IMAGEMIN_WEBP_OPTIONS, srcOptions = SRC_OPTIONS, destOptions = DEST_OPTIONS } = {}) {
	return src(sourceFiles, srcOptions)

		.pipe(imagemin([
			imageminWebp(imageminWebpOptions),
		]))
		.pipe(extReplace('.webp'))

		.pipe(size({ showFiles: true, title: 'WEBP Image Created --->' })) // size before dest results in better output in the console
		.pipe(dest(destinationDirectory, destOptions))
		.pipe(notify({ message: 'WEBP Media created', onLast: true }));
}
webp.description = 'Create WEBP Media files from source files of other formats';
webp.defaults = {
	IMAGEMIN_WEBP_OPTIONS,
	SRC_OPTIONS,
	DEST_OPTIONS,
};

module.exports = webp;
