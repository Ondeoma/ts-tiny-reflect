import ts from "typescript";

export type SerializableValue =
  | null
  | undefined
  | boolean
  | number
  | string
  | readonly SerializableValue[]
  | { readonly [key: string]: SerializableValue };

export function valueToExpression(value: SerializableValue): ts.Expression {
  if (value === null) {
    return ts.factory.createNull();
  }

  if (value === undefined) {
    return ts.factory.createIdentifier("undefined");
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
    return ts.factory.createArrayLiteralExpression(
      value.map(valueToExpression),
      true,
    );
  }

  if (typeof value === "object") {
    return objectToExpression(value);
  }

  const _exhaustive: never = value;
  throw new TypeError("Error on valueToExpression: unknown type.");
}

function numberToExpression(value: number): ts.Expression {
  if (Number.isNaN(value)) {
    return ts.factory.createIdentifier("NaN");
  }
  const absExpr =
    Math.abs(value) === Infinity
      ? ts.factory.createIdentifier("Infinity")
      : ts.factory.createNumericLiteral(Math.abs(value));
  return value < 0
    ? ts.factory.createPrefixUnaryExpression(ts.SyntaxKind.MinusToken, absExpr)
    : absExpr;
}

function objectToExpression(obj: object): ts.Expression {
  return ts.factory.createObjectLiteralExpression(
    Object.entries(obj).map(([key, value]) => {
      return ts.factory.createPropertyAssignment(
        ts.factory.createStringLiteral(key),
        valueToExpression(value),
      );
    }),
    true,
  );
}
