import R = require("ramda");
import S = require("./_syntax");
import dropEachOfProp = require("../util/drop-each-of-prop");

export = <MutatorPlugin>{
  name: "tweak-switch",
  nodeTypes: [S.SwitchStatement],
  mutator: function (node):  ESTree.Node[] {
    return dropEachOfProp("cases", node);
  },
};
