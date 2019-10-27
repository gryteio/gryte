const through = require('through2'),
  handlebars = require('handlebars'),
  fs = require('fs'),
  config = require('../../config');

module.exports = (collection) => {
    async function handle(file, enc, callback) {
        var self = this;
        try {
            const logo = fs.readFileSync(config.logo, 'utf8');
            const template = handlebars.compile(file.contents.toString());
            var html = template({
                "menu": collection, 
                "logo": logo, 
                "guid": guidGenerator()
            });
            file.contents = Buffer.from(html);
            file.basename = 'index.html';
            file.extname = '.html';
            self.push(file);
        } catch (err) {
            callback(err);
        }
        callback();
    }
    return through.obj(handle);
}

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4());
}