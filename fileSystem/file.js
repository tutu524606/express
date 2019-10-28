var fs = require('fs');
class File {
    constructor() {

    }
    readdir(directory = '../routes', cb) {
        return fs.readdir(directory, function(err, files) {
            if (err) return console.error(err);
            cb(files, err);
        })
    }
}
module.exports = File;