import S from "./_syntax";
import * as util from "./util";
import { MutatorPlugin } from "../types";

// drops each argument to a function/method call in turn
// input: `fn(a, b, c)`
// output: [`fn(b, c)`, `fn(a, c)`, `fn(a, b)`]

const plugin: MutatorPlugin = {
  type: "mutator",
  name: "tweak-arguments",
  nodeTypes: [S.CallExpression],
  filter: util.lengthAtPropGreaterThan("arguments", 0),
  mutator: util.dropEachOfProp("arguments"),
};

export default plugin;
