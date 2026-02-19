import ts from "typescript";
import { ContextBag } from "../../common";
import { isObjectType, isTypeReference } from "../../utils";
import { createDiagnostic, DiagnosticMessage } from "../../diagnosticMessages";
import {
  AnyType,
  ArrayType,
  FunctionType,
  IntersectionType,
  LiteralType,
  NeverType,
  ObjectType,
  PrimitiveType,
  TupleType,
  TypeMeta,
  UnionType,
  UnknownType,
  VoidType,
} from "./types";

export function extractTypeMetadata(
  context: ContextBag,
  type: ts.Type,
  node: ts.Node,
  visited = new Set<ts.Type>(),
): TypeMeta {
  if (visited.has(type)) {
    const name =
      type.aliasSymbol?.name || type.getSymbol()?.name || "anonymous";
    return { kind: "reference", name };
  }
  const nextVisited = new Set(visited).add(type);

  const typeMeta =
    tryIntoSpecialTypeMeta(context, type) ||
    tryIntoLiteralTypeMeta(context, type, node) ||
    tryIntoPrimitiveTypeMeta(context, type) ||
    tryIntoTupleTypeMeta(context, type, node, nextVisited) ||
    tryIntoArrayTypeMeta(context, type, node, nextVisited) ||
    tryIntoAlgebraicTypeMeta(context, type, node, nextVisited) ||
    tryIntoFunctionTypeMeta(context, type, node, nextVisited) ||
    tryIntoObjectTypeMeta(context, type, node, nextVisited);

  if (typeMeta) {
    return typeMeta;
  }

  const diag = DiagnosticMessage.TypeDeterminationFailed();
  context.extra.addDiagnostic(createDiagnostic(node, diag));
  return { kind: "unknown" };
}

function tryIntoSpecialTypeMeta(
  context: ContextBag,
  type: ts.Type,
): AnyType | UnknownType | NeverType | VoidType | undefined {
  const flags = type.getFlags();
  if (flags & ts.TypeFlags.Any) return { kind: "any" };
  if (flags & ts.TypeFlags.Unknown) return { kind: "unknown" };
  if (flags & ts.TypeFlags.Never) return { kind: "never" };
  if (flags & ts.TypeFlags.Void) return { kind: "void" };
}

function tryIntoLiteralTypeMeta(
  context: ContextBag,
  type: ts.Type,
  node: ts.Node,
): LiteralType | undefined {
  const flags = type.getFlags();
  if (type.isStringLiteral()) {
    return { kind: "literal", value: type.value };
  }
  if (type.isNumberLiteral()) {
    return { kind: "literal", value: type.value };
  }
  if (flags & ts.TypeFlags.BooleanLiteral) {
    return {
      kind: "literal",
      value: context.checker.typeToString(type) === "true",
    };
  }
  if (flags & ts.TypeFlags.Null) {
    return { kind: "literal", value: null };
  }
  if (flags & ts.TypeFlags.BigIntLiteral) {
    const diag = DiagnosticMessage.BigIntNotSupported();
    context.extra.addDiagnostic(createDiagnostic(node, diag));
    return undefined;
  }
}

function tryIntoPrimitiveTypeMeta(
  context: ContextBag,
  type: ts.Type,
): PrimitiveType | undefined {
  const flags = type.getFlags();
  if (flags & ts.TypeFlags.String)
    return { kind: "primitive", typeName: "string" };
  if (flags & ts.TypeFlags.Number)
    return { kind: "primitive", typeName: "number" };
  if (flags & ts.TypeFlags.Boolean)
    return { kind: "primitive", typeName: "boolean" };
  if (flags & ts.TypeFlags.Undefined)
    return { kind: "primitive", typeName: "undefined" };
}

function tryIntoTupleTypeMeta(
  context: ContextBag,
  type: ts.Type,
  node: ts.Node,
  visited: Set<ts.Type>,
): TupleType | undefined {
  if (
    context.checker.isTupleType(type) &&
    isObjectType(type) &&
    isTypeReference(type)
  ) {
    const elements = (type.typeArguments || []).map((t) =>
      extractTypeMetadata(context, t, node, visited),
    );
    return { kind: "tuple", elements };
  }
}

function tryIntoArrayTypeMeta(
  context: ContextBag,
  type: ts.Type,
  node: ts.Node,
  visited: Set<ts.Type>,
): ArrayType | undefined {
  if (
    context.checker.isArrayType(type) &&
    isObjectType(type) &&
    isTypeReference(type)
  ) {
    const elementType = type.typeArguments?.[0];
    if (elementType) {
      return {
        kind: "array",
        type: extractTypeMetadata(context, elementType, node, visited),
      };
    }
    return { kind: "array", type: { kind: "any" } }; // Fallback
  }
}

function tryIntoAlgebraicTypeMeta(
  context: ContextBag,
  type: ts.Type,
  node: ts.Node,
  visited: Set<ts.Type>,
): UnionType | IntersectionType | undefined {
  if (type.isUnion()) {
    return {
      kind: "union",
      types: type.types.map((t) =>
        extractTypeMetadata(context, t, node, visited),
      ),
    };
  }
  if (type.isIntersection()) {
    return {
      kind: "intersection",
      types: type.types.map((t) =>
        extractTypeMetadata(context, t, node, visited),
      ),
    };
  }
}

function tryIntoFunctionTypeMeta(
  context: ContextBag,
  type: ts.Type,
  node: ts.Node,
  visited: Set<ts.Type>,
): FunctionType | undefined {
  const callSignatures = type.getCallSignatures();
  // Though it may have multiple callsignatures, simply use last one for now.
  if (callSignatures.length > 0) {
    const signature = callSignatures[0]!;
    const params = signature.getParameters().map((symbol) => {
      const paramType = context.checker.getTypeOfSymbolAtLocation(symbol, node);
      return {
        name: symbol.name,
        type: extractTypeMetadata(context, paramType, node, visited),
      };
    });
    const returnType = signature.getReturnType();

    return {
      kind: "function",
      name: type.symbol?.name,
      params,
      returns: extractTypeMetadata(context, returnType, node, visited),
    };
  }
}

export function tryIntoObjectTypeMeta(
  context: ContextBag,
  type: ts.Type,
  node: ts.Node,
  visited: Set<ts.Type>,
): ObjectType | undefined {
  if (isObjectType(type)) {
    const props = type.getProperties();
    const members = props.map((symbol) => {
      const decl = symbol.valueDeclaration || symbol.declarations?.[0];
      const memberType = context.checker.getTypeOfSymbolAtLocation(
        symbol,
        node,
      );
      const isOptional = (symbol.flags & ts.SymbolFlags.Optional) !== 0;

      const isReadonly = (() => {
        if (!decl) {
          return false;
        }
        const modifiers = ts.getCombinedModifierFlags(decl);
        return (modifiers & ts.ModifierFlags.Readonly) !== 0;
      })();

      return {
        name: symbol.name,
        type: extractTypeMetadata(context, memberType, node, visited),
        optional: isOptional,
        readonly: isReadonly,
      };
    });

    return {
      kind: "object",
      name: type.aliasSymbol?.name || type.symbol?.name,
      members,
    };
  }
}
