import {
  AnyType,
  ArrayType,
  FunctionType,
  IntersectionType,
  LiteralType,
  NeverType,
  ObjectType,
  PrimitiveType,
  ReferenceType,
  TupleType,
  TypeMeta,
  UnionType,
  UnknownType,
  VoidType,
} from "./types";

export function isAnyType(value: TypeMeta): value is AnyType {
  return value.kind === "any";
}

export function isUnknownType(value: TypeMeta): value is UnknownType {
  return value.kind === "unknown";
}

export function isNeverType(value: TypeMeta): value is NeverType {
  return value.kind === "never";
}

export function isVoidType(value: TypeMeta): value is VoidType {
  return value.kind === "void";
}

export function isPrimitiveType(value: TypeMeta): value is PrimitiveType {
  return value.kind === "primitive";
}

export function isLiteralType(value: TypeMeta): value is LiteralType {
  return value.kind === "literal";
}

export function isArrayType(value: TypeMeta): value is ArrayType {
  return value.kind === "array";
}

export function isTupleType(value: TypeMeta): value is TupleType {
  return value.kind === "tuple";
}

export function isFunctionType(value: TypeMeta): value is FunctionType {
  return value.kind === "function";
}

export function isObjectType(value: TypeMeta): value is ObjectType {
  return value.kind === "object";
}

export function isUnionType(value: TypeMeta): value is UnionType {
  return value.kind === "union";
}

export function isIntersectionType(value: TypeMeta): value is IntersectionType {
  return value.kind === "intersection";
}

export function isReferenceType(value: TypeMeta): value is ReferenceType {
  return value.kind === "reference";
}
