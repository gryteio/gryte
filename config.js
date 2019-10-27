const fs = require('fs'),
  path = require('path');

module.exports = {
    "external": {
        "path": process.cwd(),
        "data": getExternalConfig()
    },
    "url": process.cwd() + '/source/**/*.md',
    "scss": path.resolve(__dirname, "styles/**/*.scss"),
    "html": path.resolve(__dirname, "templates/index.html"),
    "template": path.resolve(__dirname, "cli/templates/index.hbs"),
    "js": path.resolve(__dirname, "dist/gryte.js"),
    "dist": process.cwd() + '/output',
    "logo": path.resolve(__dirname, "assets/logo.svg")
}

function getExternalConfig() {
    try {
        loadConfigFile().then(data, () => {
            return data;
        }); 
    } catch(err) {
        return "";
    }
}

async function loadConfigFile() {
    var external = path.resolve(fs.realpathSync(process.cwd()), "gryte.config.json");
    try {
        const configFilePath = await resolveAppPath(external);
        return require(external);
    } catch {
        return "";
    }
}


const resolveAppPath = (path) => {
    return new Promise(fulfil => {
        fs.access(path, exists =>
            fulfil(exists)
        );
    });
}