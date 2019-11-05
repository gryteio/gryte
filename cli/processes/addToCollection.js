const through = require("through2");
const path = require("path");
const loadConfig = require("../utils/loadConfig");

module.exports = collection => {
  async function handle(file, enc, callback) {
    var self = this;
    var data = file.frontMatter;
    const srcPath = path.resolve(loadConfig("src"));
    try {
      if (data.name && data.area) {
        if (file.history.length > 0) {
          data.path = file.history[file.history.length - 1].replace(
            srcPath,
            ""
          );
        } else {
          data.path = file.history[0].replace(srcPath, "");
        }
        if (data.title == null) {
          data.title = data.name;
        }
        if (collection[data.area] == null) {
          collection[data.area] = { name: data.area };
          collection[data.area].children = [];
        }
        collection[data.area].children.push({
          name: file.name,
          area: file.area,
          path: data.path,
          title: data.name
        });
        self.push(file);
      }
    } catch (err) {
      callback(err);
    }
    callback();
  }
  return through.obj(handle);
};
