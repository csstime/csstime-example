'use strict';

const gulp = require('gulp');
const config = {}; // custom config
const csstime = require('csstime-gulp-tasks');

config.useSvgSymbols = true; // custom configuration
config.themedStylesFileNames = ['mobile']; // separated themes
config.cdnPath = 'components/';
config.preprocessor = process.env.CSSTIME_PREPROCESSOR || 'less';

csstime.loadGulpTasks(gulp, config);
