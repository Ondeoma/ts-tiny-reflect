import ts from "typescript";

type DiagnosticMessage = {
  category: ts.DiagnosticCategory;
  messageText: string;
  code: number;
};

/*
  This function is from typescript internal.
*/
export function getSourceFileOfNode(node: ts.Node): ts.SourceFile;
export function getSourceFileOfNode(
  node: ts.Node | undefined,
): ts.SourceFile | undefined;
export function getSourceFileOfNode(
  node: ts.Node | undefined,
): ts.SourceFile | undefined {
  while (node && node.kind !== ts.SyntaxKind.SourceFile) {
    node = node.parent;
  }
  return node as ts.SourceFile;
}

export function createDiagnostic(
  node: ts.Node,
  message: DiagnosticMessage,
): ts.DiagnosticWithLocation {
  return {
    file: getSourceFileOfNode(node),
    start: node.pos,
    length: node.end - node.pos,
    ...message,
  };
}

export const DiagnosticMessage = {
  NotImplementedMacro(name: string) {
    return {
      category: ts.DiagnosticCategory.Error,
      code: 26000,
      messageText: `Macro "${name}" is defined in type but not implemented.`,
    };
  },
  TypeDeterminationFailed() {
    return {
      category: ts.DiagnosticCategory.Error,
      code: 26001,
      messageText: `Type determination failed. Fallback to unknown.`,
    };
  },
  BigIntNotSupported() {
    return {
      category: ts.DiagnosticCategory.Error,
      code: 26002,
      messageText: `BitInt is not supported yet.`,
    };
  },
  GettingCallSignatureFailed() {
    return {
      category: ts.DiagnosticCategory.Error,
      code: 26003,
      messageText: `Getting call signature failed.`,
    };
  },
  GettingTypeArgsFailed() {
    return {
      category: ts.DiagnosticCategory.Error,
      code: 26004,
      messageText: `Getting type arguments failed.`,
    };
  },
} satisfies Record<string, (params: any) => DiagnosticMessage>; // eslint-disable-line @typescript-eslint/no-explicit-any
