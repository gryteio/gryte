#!/usr/bin/env node
const path = require("path");
const fs = require("fs"),
  vfs = require("vinyl-fs"),
  args = require("args"),
  addToCollection = require("./processes/addToCollection"),
  processFile = require("./processes/processMarkdown"),
  processHandlebars = require("./processes/processHandlebars"),
  sassProcess = require("./processes/sassProcess");

args
  .option("name", "name your project")
  .option("dist", "Where should we put all the files");

var arguments = args.parse(process.argv);

const config = require("../config");

const run = async () => {
  const collection = {};

  Promise.all([
    new Promise(
      (resolve, reject) => {
        vfs
          .src(config.url)
          .pipe(processFile())
          .pipe(addToCollection(collection))
          .pipe(vfs.dest(config.dist))
          .on("end", resolve);
      },
      new Promise(function(resolve, reject) {
        vfs
          .src(config.scss)
          .pipe(sassProcess())
          .pipe(vfs.dest(config.dist))
          .on("end", resolve);
      }),
      new Promise(function(resolve, reject) {
        vfs
          .src(config.js)
          .pipe(vfs.dest(config.dist))
          .on("end", resolve);
      })
    )
  ])
    .then(() => {
      vfs
        .src(config.template)
        .pipe(processHandlebars(collection))
        .pipe(vfs.dest(config.dist));
    })
    .catch(function(error) {
      console.log("error:", error);
    });
};

if (!arguments) {
  args.showHelp();
} else {
}

run();