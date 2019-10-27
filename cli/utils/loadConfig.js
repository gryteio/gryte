const config = require("../../config");

module.exports = (input) => {
    if(config.external != null && config.external.data != null && config.external.data[input] != null){
        return process.cwd() + config.external.data[input];
    } else if(config[input] != null) {
        return(config[input]);
    }
    return;
}