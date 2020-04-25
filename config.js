const fs = require("fs"),
  path = require("path");

module.exports = {
  external: {
    path: process.cwd(),
    data: loadConfigFile(),
  },
  src: process.cwd() + "/source",
  scss: path.resolve(__dirname, "source/**/*.scss"),
  css: path.resolve(__dirname, "dist/gryte.css"),
  html: path.resolve(__dirname, "templates/index.html"),
  template: path.resolve(__dirname, "cli/templates/index.hbs"),
  js: path.resolve(__dirname, "dist/gryte.js"),
  dist: process.cwd() + "/output",
  logo: path.resolve(__dirname, "assets/logo.svg"),
};

function loadConfigFile() {
  var external = path.resolve(
    fs.realpathSync(process.cwd()),
    "gryte.config.json"
  );
  try {
    if (!fs.existsSync(external)) {
      return;
    }
    return require(external);
  } catch (err) {
    return;
  }
}
