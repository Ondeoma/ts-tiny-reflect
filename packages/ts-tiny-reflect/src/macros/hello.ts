import ts from "typescript";
import { ContextBag, MacroVisitorCreator } from "../common";

export const hello = ((_context: ContextBag, _call: ts.CallExpression) => {
  return (_node: ts.Node): ts.StringLiteral =>
    ts.factory.createStringLiteral("hello");
}) satisfies MacroVisitorCreator;
