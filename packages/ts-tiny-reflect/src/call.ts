import ts from "typescript";
import type { TransformerExtras } from "ts-patch";
import path from "node:path";

import { ContextBag, MacroVisitorCreator, Options } from "./common";
import { hello } from "./macros/hello";
import { typeMetadata } from "./macros/typeMetadata";
import { createDiagnostic, DiagnosticMessage } from "./diagnosticMessages";


const macroVisitorCreators: Record<string, MacroVisitorCreator> = {
  hello,
  typeMetadata,
};


function createMacroVisitor(
  context: ContextBag,
  node: ts.Node,
): ts.Visitor | undefined {
  if (!ts.isCallExpression(node)) {
    return undefined;
  }
  const declaration: ts.Declaration | undefined =
    context.checker.getResolvedSignature(node)?.declaration;
  if (!declaration) {
    return undefined;
  }

  const location: string = path.resolve(declaration.getSourceFile().fileName);
  const libTypesLocation = path.join("ts-tiny-reflect", "dist", `types.d.ts`);
  if (location.includes(libTypesLocation)) {
    return undefined;
  }

  const { name } = context.checker.getTypeAtLocation(declaration).symbol;
  const creator = macroVisitorCreators[name];
  if (!creator) {
    const diag = createDiagnostic(node, DiagnosticMessage.NotImplementedMacro(name));
    context.extra.addDiagnostic(diag);
    return undefined;
  }
  const visitor = creator(context, node);
  return visitor;
}

function createCallVisitor(
  context: ContextBag,
): ts.Visitor {
  const visitor: ts.Visitor = (node: ts.Node) => {
    const macroVisitor = createMacroVisitor(context, node);
    if (macroVisitor) {
      return ts.visitNode(node, macroVisitor);
    } else {
      return ts.visitEachChild(node, visitor, context.transformer);
    }
  };
  return visitor;
}

export function callTransformer(
  program: ts.Program,
  options: Options,
  extra: TransformerExtras,
): ts.TransformerFactory<ts.SourceFile> {
  const checker = program.getTypeChecker();
  const printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed,
  });
  const compilerOptions = program.getCompilerOptions();

  const factory = ((transformationContext: ts.TransformationContext) =>
    (sourceFile: ts.SourceFile) => {
      const context = {
        options,
        program,
        checker,
        printer,
        compilerOptions,
        transformer: transformationContext,
        extra,
      } satisfies ContextBag;
      const visitor = createCallVisitor(
        context,
      );
      return (
        ts.visitNode(sourceFile, visitor, ts.isSourceFile) ??
        ts.factory.updateSourceFile(sourceFile, [])
      );
    }) satisfies ts.TransformerFactory<ts.SourceFile>;

  return factory;
}
