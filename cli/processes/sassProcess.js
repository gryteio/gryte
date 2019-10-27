const through = require('through2'),
  sass = require('node-sass');

module.exports = () => {
    async function handle(file, enc, callback) {
        var self = this;

        try {
            const result = sass.renderSync({
                data: file.contents.toString()
            });
            file.contents = Buffer.from(result.css);
            file.extname = '.css';
            self.push(file);
        } catch (err) {
            callback(err);
        }
        
        callback();
    }
    return through.obj(handle);
}


