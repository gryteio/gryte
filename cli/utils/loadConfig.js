const config = require("../../config");
const path = require("path");

module.exports = input => {
  if (
    config.external != null &&
    config.external.data != null &&
    config.external.data[input] != null
  ) {
    return path.resolve(process.cwd() + config.external.data[input]);
  } else if (config[input] != null) {
    return config[input];
  }
  return;
};
