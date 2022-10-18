'use strict';
let { series, watch, src, dest } = require('gulp'),

    pug = require('gulp-pug'),
    sass = require('gulp-sass')(require('sass')),
    plumber = require('gulp-plumber'),
    plumberNotifier = require('gulp-plumber-notifier'),
    changed = require('gulp-changed'),
    sourcemaps = require('gulp-sourcemaps'),
    //browserSync = require('browser-sync').create(),
    browserSync = require('browser-sync'),
    gulpif = require('gulp-if'),
    wait = require('gulp-wait'),
    autoPrefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

// configurations
let gulpConfig = require('./gulp.config'),
    srcs = gulpConfig.paths.srcs,
    dists = gulpConfig.paths.dists,
    lang = gulpConfig.lang;

// if singleFile = true it will work as single file converter
function html(lang, dist, singleFile) {
    return src(srcs.pug)
        .pipe(gulpif(singleFile, changed(dists.html, {extension: '.html'})))
        .pipe(plumber())
        .pipe(plumberNotifier())
        .pipe(pug({
            pretty: true,
            data: {
                lang: lang.name,
                langDir: lang.direction,
                baseUrl: lang.baseUrl,
            }
        }))
        .pipe(dest(dist))
        .pipe(gulpif(singleFile, browserSync.stream()))
        .on('error', function(err) {
            console.log(err)
        });
}
// handling images
async function compressed_images(){
    return src(srcs.cImages)
    //Custom plugin options
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    // path of exporting files
    .pipe(dest(dists.images))
    // streaming for browserSync functionality to auto refreshing  
    .pipe(browserSync.stream())
}

function viewsAll (cb) {
    html(lang.default, dists.html);
    // check if secondary language is active
    if(lang.secondary.active) html(lang.secondary, dists.html + lang.secondary.name);
    cb();
}
function viewsSingle(cb) {
    html(lang.default, dists.html, true);
    // check if secondary language is active
    if(lang.secondary.active) html(lang.secondary, dists.html + lang.secondary.name, true);
    cb();
}

function style() {
    return src(srcs.scssWatch)
        .pipe(wait(1))
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(plumberNotifier())
        .pipe(sass())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(dists.css))
        .pipe(browserSync.stream())
}
function styles(){
    // start operations in scss files
    //return gulp.src('./src/scss/**/*.scss')
    return src(srcs.scssWatch)
    // initialize sourcemaps file
    .pipe(sourcemaps.init())
    // type of sourcemaps file should be compressed and handling error
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    // using autoprefixer to autogenerate css prefix which compatable with all browsers 
    .pipe(autoPrefixer())
    // start to write sourcemaps
    .pipe(sourcemaps.write())
    // renaming of exporting file
    .pipe(rename('main.min.css'))
    // path of exporting files
    .pipe(dest(dists.css))
    // streaming for browserSync functionality to auto refreshing  
    .pipe(browserSync.stream())
}

// handling javascript files
function scripts(){
    // path of tracking files
    return src(srcs.scripts)
    // start to uglify javascript files
    .pipe(uglify())
    // renaming output file
    .pipe(rename('main.min.js'))
    // set final path of external javascript file    
    .pipe(dest(dists.js))    
    // streaming for browserSync functionality to auto refreshing
    .pipe(browserSync.stream())
}

exports.style = style;
exports.default = series (
    viewsAll,
    style,
    //-styles,
    scripts,
    compressed_images,
    function() {
        browserSync.init({
            server: {
                baseDir: dists.html
            }
        });
        watch(srcs.pug, { queue: false }, viewsSingle);
        watch(srcs.pugIncludes, { queue: false }, viewsAll);
        watch(srcs.scssWatch, { queue: false }, style);
    }
)