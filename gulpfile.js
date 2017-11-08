// based on: https://github.com/shakyShane/jekyll-gulp-sass-browser-sync

'use strict';

const gulp        	= require('gulp');
const sass        	= require('gulp-sass');
const notify      	= require("gulp-notify");
const sourcemaps  	= require('gulp-sourcemaps');
const postcss				= require('gulp-postcss');
const cp          	= require('child_process');
const browserSync 	= require('browser-sync');
const eyeglass    	= require('eyeglass');

/**
* Eyeglass options for sass
* @type {Object}
*/
var options = {
	includePaths: ['scss'],
	onError: browserSync.notify,
	precision: 10,
	// outputStyle: 'compressed',
	engines: {
		sass: sass
	}
};

/**
* Build the Jekyll Site
*/
gulp.task('jekyll-build', function (done) {
	browserSync.notify('<span style="color: grey">Running:</span> $ jekyll build');
	return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
	.on('close', done);
});

/**
* Rebuild Jekyll & do page reload
*/
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
	browserSync.reload();
});

/**
* Wait for jekyll-build, then launch the Server
*/
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
	browserSync({
		server: {
			baseDir: '_site'
		}
	});
});

/**
* Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
*/
gulp.task('sass', function () {
	var minBrowserSupport = ["ie >= 9", "> 0.1%"]; //, "not ie 8", "not OperaMini all"];
	var usageLogged = [];

	/**
	 * Current post css fixes
	 * - flexbox
	 * - vmin -> vm (IE 9 + 10)
	 * - rem -> px (IE 9 + 10)
	 * - ::psuedo-element -> :psuedo-element
	 */

	// postCSS plugins
	const pseudoElements 	= require('postcss-pseudoelements');
	const pixrem					= require('pixrem');
 	const autoprefixer 		= require('autoprefixer');
 	const doiuse					= require('doiuse');
	const cssnano					= require('cssnano');
	const vmin						= require('postcss-vmin');

	return gulp.src('_scss/**.scss')
		.pipe(sourcemaps.init())
		.pipe(sass(eyeglass(options)).on('error', notify.onError(function (error) {
			// cp.exec("atom "+ error.file + ":" + error.line + ":" + error.column);
			return "Problem file : " + error.message;
		})))
		.pipe(postcss([
			pseudoElements(),
			// cssnano(),
			pixrem({
				rootValue: 16,
				replace: false,
				atrules: false,
				html: true,
				browsers: minBrowserSupport,
				unitPrecision: 3
			}),
			vmin(),
			autoprefixer(minBrowserSupport),
			// doiuse({
			// 	browsers: minBrowserSupport,
			// 	ignore: ['rem'],
			// 	onFeatureUsage: function(usageInfo) {
			// 		if(usageLogged.indexOf(usageInfo.feature) <= -1){
			// 			usageLogged.push(usageInfo.feature);
			// 			console.log(usageInfo.feature);
			// 		}
			// 	}
			// }),
		]))
		.pipe(sourcemaps.write("../_maps"))
		.pipe(gulp.dest('_site/css'))
		.pipe(browserSync.reload({stream:true}))
		.pipe(gulp.dest('css'));
});

/**
* Watch scss files for changes & recompile
* Watch html/md files, run jekyll & reload BrowserSync
*/
gulp.task('watch', function () {
	gulp.watch('_scss/*.scss', ['sass']);
	gulp.watch(['_scss/_baseline.scss', '_scss/base/*.scss'], ['sassdoc']);
	gulp.watch(['*.html', '_layouts/*.html', '_includes/**/*.html', '_posts/*'], ['jekyll-rebuild']);
});

/**
* Default task, running just `gulp` will compile the sass,
* compile the jekyll site, launch BrowserSync & watch files.
*/
gulp.task('default', ['browser-sync', 'watch']);
