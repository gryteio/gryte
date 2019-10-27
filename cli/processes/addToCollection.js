const through = require("through2");

const paths = require("../../config");

module.exports = collection => {
  async function handle(file, enc, callback) {
    var self = this;
    var data = file.frontMatter;
    try {
      if (data.name && data.area) {
        if (file.history.length > 0) {
          data.path = file.history[file.history.length - 1].replace(
            paths.dist,
            ""
          );
        } else {
          data.path = file.history[0].replace(paths.dist, "");
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
