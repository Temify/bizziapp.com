var pkg = require('../package.json');
var argv = require('minimist')(process.argv.slice(2), {
    alias: {
        p: 'production',
        t: 'target'
    }
});
var os = require('os');

var options = {
    production: argv.production,
    target: argv.target || 'frontend',
    platform: os.platform()
};

var dest = 'public/assets/' + options.target;
var src = 'src/' + options.target;
var templates = 'gulp/templates';

module.exports = {
    options: options,
    browserSync: {
        // proxy: pkg.name + (options.platform === 'win32' ? '.local' : '.loc'),
        server: {
            baseDir: "public"
        },
        files: [
            dest + '/**',
            '!' + dest + '/**.map'
        ],
        open: false
    },
    styles: {
        src: [src + '/css/*.styl', '!' + src + '/css/imports.styl'],
        dest: dest + '/css',
        watch: [src + '/css/**/*.styl', '!' + src + '/css/_exports/sprite*.styl'],
        imgRoot: '../img/',
        paths: dest + '/img/'
    },
    images: {
        src: src + '/img/**/*',
        rawSrc: src + '/img-raw/**/*',
        watch: [src + '/img/**/*', src + '/img-raw/**/*'],
        dest: dest + '/img',
        rasterSrc: src + '/img/**/*.svg',
        rasterDest: src + '/img'
    },
    jade: {
        src: src + '/views/*.jade',
        watch: src + '/views/**/*.jade',
        dest: 'public/'
    },
    iconfont: {
        name: 'icons',
        src: src + '/iconfont/*.svg',
        dest: dest + '/fonts/icons',
        template: templates + '/iconfont.lodash',
        path: '../fonts/icons/',
        css: src + '/css/_exports'
    },
    fonts: {
        src: src + '/fonts/**/*',
        dest: dest + '/fonts'
    },
    sprites: {
        src: src + '/sprites',
        watch: src + '/sprites/**/*.png',
        css: src + '/css/_exports',
        img: src + '/img/sprites',
        template: templates + '/sprite-template.handlebars'
    },
    scripts: {
        src: [
            src + '/js/plugins/**/*.js',
            src + '/js/*',
            src + '/js/modules/**/*.js',
            src + '/js/app.js'
        ],
        dest: dest + '/js',
        watch: src + '/js/**/*.js',
        copy: [
            src + '/js/vendor/**/*.js'
        ]
    },
    bower: {
        frontend: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/console-polyfill/index.js',
            'bower_components/matchmedia/matchMedia.js',
            'bower_components/matchmedia/matchMedia.addListener.js',
            'bower_components/enquire/dist/enquire.js',
            'bower_components/es5-shim/es5-shim.js',
            'bower_components/fastclick/lib/fastclick.js'
        ]
    }
};
