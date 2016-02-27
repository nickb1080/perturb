"use strict";

const fs = require("fs");

const R = require("ramda");
const Mocha = require("mocha");
const Future = require("bluebird");
const escodegen = require("escodegen");

const mapMirror = require("../util/map-mirror");

const doesNotInclude = R.curry(function (arr, val) {
  return arr.indexOf(val) === -1;
});

module.exports = {
  // before :: Muatation -> Promise<Void>
  before (mutation) {
    delete require.cache[mutation.source];

    fs.writeFileSync(mutation.source, mutation.mutatedSourceCode);
    return {
      cache: mapMirror(Object.keys(require.cache)),
      listeners: process.listeners("uncaughtException"),
    }
  },

  // runner :: Mutation -> Promise<MutationResult>
  run (mutation) {
    return new Future(function (resolve) {
      let failedOn;

      function reporter (suite) {
        suite.on("fail", test => failedOn = test);
      }

      const mocha = new Mocha({reporter, bail: true});
      mutation.tests.forEach(t => mocha.addFile(t));

      try {
        mocha.run(function () {
          resolve(failedOn);
        });
      } catch (err) {
        return resolve(err);
      }
    })
    .then(error => Object.assign({}, mutation, {error}));
  },

  // after :: Mutation -> Before? -> Promise<Void>
  after (mutation, before) {
    // write the original source code back to it's location
    fs.writeFileSync(mutation.source, mutation.sourceCode);

    // remove danging uncaughtException listeners Mocha didn't clean up
    process.listeners("uncaughtException")
      .filter(doesNotInclude(before.listeners))
      .forEach(f => process.removeListener("uncaughtException", f));

    // remove all modules that were required by this test
    Object.keys(require.cache)
      .filter(k => !before.cache[k])
      .forEach(k => delete require.cache[k]);
  },
};