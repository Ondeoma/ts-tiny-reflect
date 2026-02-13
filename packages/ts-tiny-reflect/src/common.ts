import ts, { CallExpression } from "typescript";
import type { TransformerExtras } from "ts-patch";

export type Options = {};

export interface ContextBag {
  options: Options;

  program: ts.Program;
  compilerOptions: ts.CompilerOptions;
  checker: ts.TypeChecker;
  printer: ts.Printer;
  transformer: ts.TransformationContext;
  extra: TransformerExtras;
}

export type MacroVisitorCreator = (context: ContextBag, call: CallExpression) => ((node: ts.Node) => ts.Node | undefined)
