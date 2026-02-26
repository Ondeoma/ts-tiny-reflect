import ts from "typescript";
import { ContextBag, MacroVisitorCreator } from "../../common";
import { valueToExpression } from "../../utils/valueToExpression";
import { createDiagnostic, DiagnosticMessage } from "../../diagnosticMessages";
import {
  extractTypeMetadata,
  tryIntoObjectTypeMeta,
  TypeTracker,
} from "./extract";
import { parseNumber } from "../../utils/expressionToValue";

function extractTypeArguments(
  context: ContextBag,
  node: ts.CallExpression,
): readonly ts.Type[] | undefined {
  const originalCallExpression = ts.getOriginalNode(node);
  if (!ts.isCallExpression(originalCallExpression)) {
    return undefined;
  }

  const signature = context.checker.getResolvedSignature(
    originalCallExpression,
  );
  if (!signature) {
    const diag = DiagnosticMessage.GettingCallSignatureFailed();
    context.extra.addDiagnostic(createDiagnostic(node, diag));
    return undefined;
  }
  const typeArgs =
    context.checker.getTypeArgumentsForResolvedSignature(signature);

  return typeArgs;
}

export const typeMetadata = ((
  context: ContextBag,
  _call: ts.CallExpression,
) => {
  const visitor = (node: ts.Node): ts.Expression => {
    if (!ts.isCallExpression(node)) {
      throw new Error("Macro call must be a CallExpression.");
    }

    const depth =
      node.arguments[0] && parseNumber(node.arguments[0], context.checker);
    if (node.arguments[0] && depth === undefined) {
      const diag = DiagnosticMessage.FailedToParseArguments();
      context.extra.addDiagnostic(createDiagnostic(node.arguments[0], diag));
      return node;
    }

    const typeArgs = extractTypeArguments(context, node);
    if (typeArgs === undefined || 1 !== typeArgs.length) {
      const diag = DiagnosticMessage.GettingTypeArgsFailed();
      context.extra.addDiagnostic(createDiagnostic(node, diag));
      return node;
    }

    const metadata = extractTypeMetadata(context, typeArgs[0]!, node, depth);
    return ts.factory.createAsExpression(
      valueToExpression(metadata),
      ts.factory.createTypeReferenceNode("const", undefined),
    );
  };
  return visitor;
}) satisfies MacroVisitorCreator;

export const objectMetadata = ((
  context: ContextBag,
  _call: ts.CallExpression,
) => {
  const visitor = (node: ts.Node): ts.Expression => {
    if (!ts.isCallExpression(node)) {
      throw new Error("Macro call must be a CallExpression.");
    }

    const depth =
      node.arguments[0] && parseNumber(node.arguments[0], context.checker);
    if (node.arguments[0] && depth === undefined) {
      const diag = DiagnosticMessage.FailedToParseArguments();
      context.extra.addDiagnostic(createDiagnostic(node.arguments[0], diag));
      return node;
    }

    const typeArgs = extractTypeArguments(context, node);
    if (typeArgs === undefined || 1 !== typeArgs.length) {
      const diag = DiagnosticMessage.GettingTypeArgsFailed();
      context.extra.addDiagnostic(createDiagnostic(node, diag));
      return node;
    }

    const metadata = tryIntoObjectTypeMeta(
      context,
      typeArgs[0]!,
      node,
      depth,
      TypeTracker.empty(),
    );
    if (!metadata) {
      const diag = DiagnosticMessage.MismatchWithTypeAssumptions();
      context.extra.addDiagnostic(createDiagnostic(node, diag));
      return node;
    }
    return ts.factory.createAsExpression(
      valueToExpression(metadata),
      ts.factory.createTypeReferenceNode("const", undefined),
    );
  };
  return visitor;
}) satisfies MacroVisitorCreator;
