const fs = require('fs'),
  path = require('path');

module.exports = {
    "internal": {
        "data": require(path.resolve(__dirname, "gryte.config.json"))
    },
    "external": {
        "data": getExternalConfig()
    },
    "url": process.cwd() + '/source/**/*.md',
    "dist": process.cwd() + '/output'

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