var S = require("estraverse").Syntax;

export = {
  [S.IfStatement]: S.IfStatement,
  [S.WhileStatement]: S.WhileStatement,
  [S.DoWhileStatement]: S.DoWhileStatement,
  [S.ForStatement]: S.ForStatement,
  [S.ConditionalExpression]: S.ConditionalExpression,
  [S.SwitchCase]: S.SwitchCase,
};
