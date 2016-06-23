"use strict";

const join = require("path").join;
const glob = require("glob");
const fs = require("fs-extra");
const R = require("ramda");

const shouldSymlink = {node_modules: "node_modules"};

const has = obj => key => obj.hasOwnProperty(key);

function setupPerturbDirectory (config) {

  // maybe remove this? if it exists it means there is a bug with cleanup
  fs.removeSync(config.perturbRoot);
  fs.mkdirSync(config.perturbRoot);
  fs.copySync(config.originalSourceDir, config.perturbSourceDir);
  fs.copySync(config.originalTestDir, config.perturbTestDir);

  fs.readdirSync(config.rootDir)
    .filter(has(shouldSymlink))
    .map(item => [join(config.rootDir, item), join(config.perturbRoot, item)])
    .forEach(R.apply(fs.symlinkSync))
}

function teardownPerturbDirectory (config) {
  fs.removeSync(config.perturbRoot);
}

function getFilePaths (config) {
  // const sources = glob.sync(config.perturbTestDir + config.testGlob)
  //   .map(p => path.resolve(p)) // get absolute paths
  //   .map(s => s.slice(config.perturbRoot)); // trim to path w/in project
  
  // const tests = glob.sync(config.perturbSourceDir + config.sourceGlob)
  //   .map(p => path.resolve(p)) // get absolute paths
  //   .map(s => s.slice(config.perturbRoot)); // trim to path w/in project

  return {
    sources: glob.sync(config.perturbSourceDir + config.sourceGlob),
    tests: glob.sync(config.perturbTestDir + config.testGlob),
  };
}

module.exports = function (config) {
  return {
    setup () {
      setupPerturbDirectory(config);
    },
    teardown () {
      teardownPerturbDirectory(config);
    },
    paths () {
      return getFilePaths(config);
    },
  };
}
