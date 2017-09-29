var gulp        = require('gulp');
var spritesmith = require('gulp.spritesmith');
var path        = require('path');
var fs          = require('fs');
var mergeStream = require('merge-stream');
var getFiles    = require('../util/getFiles');
var getFolders  = require('../util/getFolders');
var config      = require('../config').sprites;

gulp.task('sprites:clean', function(callback) {
    // image cleanup
    if (fs.existsSync(config.img)) {
        var images = getFiles(config.img);
        images.forEach(function(file) {
            var folder = path.join(config.src, path.basename(file.replace('@2x',''), '.png'));
            var image = path.join(config.img, file);

            if (!fs.existsSync(folder)) {
                fs.unlinkSync(image);
            }
        });
    }

    // css cleanup
    if (fs.existsSync(config.css)) {
        var styles = getFiles(config.css, 'sprite');
        styles.forEach(function(file) {
            var folder = path.join(config.src, path.basename(file, '.styl').replace('sprite-', ''));
            var style = path.join(config.css, file);

            if (!fs.existsSync(folder)) {
                fs.unlinkSync(style);
            }
        });
    }

    callback();
});

gulp.task('sprites', ['sprites:clean'], function(callback) {
    var folders = getFolders(config.src);
    var tasks = folders.filter(function(folder) {
        var source = path.join(config.src, folder);
        var image = path.join(config.img, folder + '.png');
        var style = path.join(config.css, 'sprite-' + folder + '.styl');

        return !fs.existsSync(image) || !fs.existsSync(style) || fs.statSync(source).mtime > fs.statSync(image).mtime;
    }).map(function(folder) {
        var retinaFiles = getFiles(path.join(config.src, folder), '@2x');

        var spriteOptions = {
            imgName: folder + '.png',
            imgPath: 'sprites/' + folder + '.png',
            algorithm: 'binary-tree',
            cssName: 'sprite-' + folder + '.styl',
            // cssVarMap: function (sprite) {
            //     // sprite.name = 'sprite-' + folder + '-' + sprite.name;
            // },
            cssTemplate: config.template,
            cssOpts: {
                'functions': true,
                'name': folder,
                'retina': false
            }
        };

        if (retinaFiles.length) {
            spriteOptions.retinaSrcFilter = path.join(config.src, folder, '/*@2x.png');
            spriteOptions.retinaImgName = folder + '@2x.png';
            spriteOptions.retinaImgPath = 'sprites/' + folder + '@2x.png';
            spriteOptions.cssOpts.retina = true;
        }

        var spriteData = gulp.src(path.join(config.src, folder, '/*.png'))
            .pipe(spritesmith(spriteOptions));

        spriteData.img.pipe(gulp.dest(config.img));
        spriteData.css.pipe(gulp.dest(config.css));

        return spriteData;
    });

    if (tasks.length) {
        return mergeStream(tasks);
    } else {
        callback();
    }
});