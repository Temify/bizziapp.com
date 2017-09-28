var fs = require('fs');
var path = require('path');

module.exports = function(dir, filter) {
    var files = fs.readdirSync(dir)
        .filter(function(file) {
            return fs.statSync(path.join(dir, file)).isFile();
        });

    if (filter) {
        files = files.filter(function(file) {
            return file.match(new RegExp(filter));
        });
    }

    return files;
}