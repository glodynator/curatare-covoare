const { parallel, series, watch } = require('gulp');
const copy = require('./gulpfiles/copy');
const clean = require('./gulpfiles/clean');

const DIR_SOURCE = './src/resources';
const DIR_BUILD = './dist';

/* ------------------------------------------------------------------------------------------------------------------------ *\
   STYLE Tasks
\* ------------------------------------------------------------------------------------------------------------------------ */

const styles = require('./gulpfiles/styles');

const FILES_SOURCE_STYLES = [
    `${DIR_SOURCE}/scss/**/*.scss`,
];
const DIR_BUILD_STYLES = `${DIR_BUILD}/css`;
const FILES_BUILD_STYLES = `${DIR_BUILD_STYLES}/**/*.css`;

const sassOptions = styles.build.defaults.SASS_OPTIONS;
sassOptions.includePaths.push('node_modules');

const fnBuildStyles = () => styles.build(FILES_SOURCE_STYLES, DIR_BUILD_STYLES, { sassOptions });
const fnOptimizeStyles = () => styles.optimize(FILES_BUILD_STYLES, DIR_BUILD_STYLES);
const fnWatchStyles = () => watch(FILES_SOURCE_STYLES, series(fnBuildStyles));
const fnDeleteStyles = () => clean(FILES_BUILD_STYLES);
const fnCreateDevelopmentStyles = series(fnBuildStyles);
const fnCreateProductionStyles = series(fnOptimizeStyles);

exports['styles:development'] = fnCreateDevelopmentStyles;
exports['styles:production'] = fnCreateProductionStyles;
exports['styles'] = series(fnDeleteStyles, fnCreateDevelopmentStyles, fnCreateProductionStyles);
exports['styles:watch'] = fnWatchStyles;

/* ------------------------------------------------------------------------------------------------------------------------ *\
   IMAGE Tasks
\* ------------------------------------------------------------------------------------------------------------------------ */

const images = require('./gulpfiles/images');

const IMAGE_EXTENSIONS = 'png,jpg,jpeg,gif,svg,webp';

const FILES_SOURCE_IMAGES = [
    `${DIR_SOURCE}/images/**/*`,
];
const DIR_BUILD_IMAGES = `${DIR_BUILD}/images`;
const FILES_BUILD_IMAGES = `${DIR_BUILD_IMAGES}/**/*`;

const fnOptimizeImages = () => images.optimize(FILES_SOURCE_IMAGES, DIR_BUILD_IMAGES);
const fnCreateWebpImages = () => images.webp(`${FILES_BUILD_IMAGES}.{ ${IMAGE_EXTENSIONS.replace(/,svg|,webp/gmi, '')}}`, DIR_BUILD_IMAGES);
const fnDeleteImages = () => clean(FILES_BUILD_IMAGES);
const fnCreateImages = series(fnOptimizeImages, fnCreateWebpImages);

exports['images:development'] = fnCreateImages;
exports['images:production'] = fnCreateImages;
exports['images'] = series(fnDeleteImages, fnCreateImages);

const fnWatch = parallel(fnWatchStyles);
exports['watch'] = fnWatch;

const fnDevelopment = parallel(fnCreateDevelopmentStyles, fnCreateImages);
exports['development'] = fnDevelopment;

const fnProduction = parallel(fnCreateProductionStyles, fnCreateImages);
exports['production'] = fnProduction;

exports.default = parallel(fnWatch, series(fnDevelopment));