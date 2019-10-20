const through = require('through2');

const paths = require('../config');

module.exports = (collection) => {
    async function handle(file, enc, callback) {
        var self = this;
        var data = file.frontMatter;
        if (data.name && data.area) {
            file.path = file.history[1].replace(process.cwd(), "");
            if (data.title == null) {
                data.title = data.name;
            }
            if (collection[data.area] == null) {
                collection[data.area] = { 'name': data.area };
                collection[data.area].children = [];
            }
            collection[data.area].children.push({
                "name": file.name,
                "area": data.area,
                "path": file.path,
                "title": data.name
            });
        }
        callback();
    }
    return through.obj(handle);
}


