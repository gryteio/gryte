#!/usr/bin/env node

const fs = require('fs'),
  vfs = require('vinyl-fs'),
  args = require('args'),
  addToCollection = require('../util/addToCollection'),
  processFile = require('../util/process');

args.option('name', "name your project")
  .option('dist', 'Where should we put all the files');

var arguments = args.parse(process.argv);

const config = require('../config');

const run = async () => {
  const collection = {};
  console.log("Config:", config);
  Promise.all([
    new Promise((resolve, reject) => {
      vfs.src(config.url)
        .pipe(processFile())
        .pipe(addToCollection(collection))
        .pipe(vfs.dest(config.dist))
        .on('end', resolve);
    },
    new Promise(function (resolve, reject) {
      // Move assets from 07-docs to destination
      resolve();
    }),
    new Promise(function (resolve, reject) {
      // Handle SCSS inside 07-docs
      resolve();
    }),
    new Promise(function (resolve, reject) {
      // Handle JS inside 07-docs
      resolve();
    }),)
  ]).then(() => {
    fs.writeFileSync(config.dist + '/collection.json', JSON.stringify(collection));
  }).catch(function (error) {
    console.log("error:", error);
  });

}

if (!arguments) {
  args.showHelp();
} else {

}

run();



