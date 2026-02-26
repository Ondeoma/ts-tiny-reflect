import ts from "typescript";

export type ParsableValue =
  | number
  | string
  | boolean
  | readonly ParsableValue[];

export function resolveConstInitializer(
  expr: ts.Expression,
  checker: ts.TypeChecker,
): ts.Expression {
  if (!ts.isIdentifier(expr)) {
    return expr;
  }
  const symbol = checker.getSymbolAtLocation(expr);
  const decl = symbol?.valueDeclaration;
  if (!(decl && ts.isVariableDeclaration(decl) && decl.initializer)) {
    return expr;
  }
  const isConst = (ts.getCombinedNodeFlags(decl) & ts.NodeFlags.Const) !== 0;
  if (!isConst) {
    return expr;
  }
  return resolveConstInitializer(decl.initializer, checker);
}

export type Parser<T extends ParsableValue> = (
  expr: ts.Expression,
  checker: ts.TypeChecker,
) => T | undefined;

export const parseNumber: Parser<number> = (
  expr: ts.Expression,
  checker: ts.TypeChecker,
): number | undefined => {
  const resolved = resolveConstInitializer(expr, checker);
  if (ts.isNumericLiteral(resolved)) {
    return Number(resolved.text);
  }
  if (
    ts.isPrefixUnaryExpression(resolved) &&
    resolved.operator === ts.SyntaxKind.MinusToken
  ) {
    if (ts.isNumericLiteral(resolved.operand)) {
      return -Number(resolved.operand.text);
    }
  }
  if (
    ts.isEnumMember(resolved) ||
    ts.isPropertyAccessExpression(resolved) ||
    ts.isElementAccessExpression(resolved)
  ) {
    const constantValue = checker.getConstantValue(resolved);
    if (typeof constantValue === "number") {
      return constantValue;
    }
  }
  return undefined;
};

export const parseString: Parser<string> = (
  expr: ts.Expression,
  checker: ts.TypeChecker,
): string | undefined => {
  const resolved = resolveConstInitializer(expr, checker);
  if (ts.isStringLiteral(resolved)) {
    return resolved.text;
  }
  if (
    ts.isEnumMember(resolved) ||
    ts.isPropertyAccessExpression(resolved) ||
    ts.isElementAccessExpression(resolved)
  ) {
    const constantValue = checker.getConstantValue(resolved);
    if (typeof constantValue === "string") {
      return constantValue;
    }
  }
  return undefined;
};

export const parseBoolean: Parser<boolean> = (
  expr: ts.Expression,
  checker: ts.TypeChecker,
): boolean | undefined => {
  const resolved = resolveConstInitializer(expr, checker);
  if (resolved.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (resolved.kind === ts.SyntaxKind.FalseKeyword) return false;
  return undefined;
};

export function createArrayParser<T extends ParsableValue>(
  elementParser: Parser<T>,
): Parser<T[]> {
  return (expr: ts.Expression, checker: ts.TypeChecker) => {
    const resolved = resolveConstInitializer(expr, checker);
    if (!ts.isArrayLiteralExpression(resolved)) {
      return undefined;
    }

    const parsed = resolved.elements
      .map((elemExpr) => elementParser(elemExpr, checker))
      .filter((elem) => elem !== undefined);
    if (parsed.length < resolved.elements.length) {
      return undefined;
    }

    return parsed;
  };
}

export type TupleFromParsers<P extends Parser<ParsableValue>[]> = {
  [K in keyof P]: P[K] extends Parser<infer U> ? U : never;
};
export function createTupleParser<P extends Parser<ParsableValue>[]>(
  parsers: [...P],
): Parser<TupleFromParsers<P>> {
  return (expr: ts.Expression, checker: ts.TypeChecker) => {
    const resolved = resolveConstInitializer(expr, checker);
    if (!ts.isArrayLiteralExpression(resolved)) {
      return undefined;
    }
    if (resolved.elements.length !== parsers.length) {
      return undefined;
    }

    const parsed = parsers.map((parser, i) =>
      parser(resolved.elements[i]!, checker),
    );
    if (parsed.some((elem) => elem === undefined)) {
      return undefined;
    }

    return parsed as TupleFromParsers<P>;
  };
}

export type UnionFromParsers<P extends Parser<ParsableValue>[]> = {
  [K in keyof P]: P[K] extends Parser<infer U> ? U : never;
}[number];
export function createUnionParser<P extends Parser<ParsableValue>[]>(
  parsers: [...P],
): Parser<UnionFromParsers<P>> {
  return (expr: ts.Expression, checker: ts.TypeChecker) => {
    const parsed = parsers
      .values()
      .map((parser) => parser(expr, checker))
      .find((elem) => elem !== undefined);

    return parsed as UnionFromParsers<P>;
  };
}
