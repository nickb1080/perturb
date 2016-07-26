import { ReporterPlugin } from "../types";

import diffReporter = require("./diff");
import nameReporter = require("./name");

const plugins = new Map<string, ReporterPlugin>([
  [ "diff", diffReporter ],
  [ "name", nameReporter ],
]);

function locateReporterPlugins (names) {
  names.forEach(function (name) {
    let plugin: ReporterPlugin;
    try {
      plugin = require(`perturb-plugin-runner-${name}`);
      plugins.set(name, plugin);
      return;
    } catch (err) {
      // any way to recover? other locate strategy?
      console.log(`unable to locate -RUNNER- plugin "${name}" -- fatal error, exiting`);
      throw err;
    }
  });
}

export = function get (input: string | ReporterPlugin): ReporterPlugin {
  if (typeof input === "string") {
    const plugin = plugins.get(input);
    if (plugin == null) {
      throw new Error(`unable to locate -RUNNER- plugin "${input}" -- fatal error, exiting`);
    }
    return plugin;
  } else {
    return input;
  }
}

