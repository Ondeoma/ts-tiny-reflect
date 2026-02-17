import ts from "typescript";

export function getOriginalRootSymbol(
  node: ts.Node,
  checker: ts.TypeChecker,
): ts.Symbol | undefined {
  const sym = checker.getSymbolAtLocation(ts.getOriginalNode(node));
  return sym && getRootSymbol(sym, checker);
}

export function getRootSymbol(
  symbol: ts.Symbol,
  checker: ts.TypeChecker,
): ts.Symbol {
  return symbol.flags & ts.SymbolFlags.Alias
    ? checker.getAliasedSymbol(symbol)
    : symbol;
}

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
      ? RecursivePartial<T[P]>
      : T[P];
};

export function isObjectType(type: ts.Type): type is ts.ObjectType {
  return (type.flags & ts.TypeFlags.Object) !== 0;
}
export function isTypeReference(type: ts.ObjectType): type is ts.TypeReference {
  return (type.objectFlags & ts.ObjectFlags.Reference) !== 0;
}

export type SerializableValue = 
  | null 
  | undefined 
  | boolean 
  | number 
  | string 
  | SerializableValue[]
  | { [key: string]: SerializableValue };

export function valueToExpression(value: SerializableValue): ts.Expression {
  if (value === null) {
    return ts.factory.createNull()
  }

  if (value === undefined) {
    return ts.factory.createIdentifier("undefined")
  }

  if (typeof value === "boolean") {
    return value ? ts.factory.createTrue() : ts.factory.createFalse();
  }

  if (typeof value === "number") {
    return numberToExpression(value);
  }

  if (typeof value === "string") {
    return ts.factory.createStringLiteral(value);
  }

  if (Array.isArray(value)) {
    return ts.factory.createArrayLiteralExpression(value.map(valueToExpression), true);
  }

  if (typeof value === "object") {
    return objectToExpression(value);
  }

  const _exhaustive: never = value;
  throw new TypeError("Error on valueToExpression: unknown type.");
};


function numberToExpression(value: number): ts.Expression {
  if (Number.isNaN(value)) {
    return ts.factory.createIdentifier("NaN");
  }
  const absExpr = (Math.abs(value) === Infinity)
    ? ts.factory.createIdentifier("Infinity")
    : ts.factory.createNumericLiteral(Math.abs(value))
  return value < 0
    ? ts.factory.createPrefixUnaryExpression(
        ts.SyntaxKind.MinusToken,
        absExpr,
      )
    : absExpr;
}

function objectToExpression(obj: object): ts.Expression {
  return ts.factory.createObjectLiteralExpression(
    Object.entries(obj).map(([key, value]) => {
      return ts.factory.createPropertyAssignment(
          ts.factory.createStringLiteral(key),
          valueToExpression(value)
      );
    }),
    true
  );
}
