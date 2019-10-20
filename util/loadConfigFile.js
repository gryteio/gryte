export default async function getFile() {
    return await loadConfigFile();
}

async function loadConfigFile() {
    var external = path.resolve(fs.realpathSync(process.cwd()), "gryte.config.json");
    var internal = path.resolve(__dirname, "..", "gryte.config.json");
    try {
      const configFilePath = await resolveAppPath(external);
      console.log(configFilePath);
      return require(external);
    } catch {
      return require(internal);
    }
  }


  const resolveAppPath = (path) => {
    return new Promise(fulfil => {
      fs.access(path, exists =>
        fulfil(exists)
      );
    });
  }