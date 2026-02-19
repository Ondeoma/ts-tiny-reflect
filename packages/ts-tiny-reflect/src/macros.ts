//! These types shows what the macros should return.

import {
  NarrowedTypeMeta,
  TypedObjectType,
} from "./macros/typeMetadata/userTypes";
export type {
  NarrowedTypeMeta,
  TypedObjectType,
} from "./macros/typeMetadata/userTypes";
export type {
  AnyType,
  UnknownType,
  NeverType,
  VoidType,
  PrimitiveType,
  LiteralType,
  ArrayType,
  TupleType,
  FunctionType,
  ObjectType,
  UnionType,
  IntersectionType,
  ReferenceType,
} from "./macros/typeMetadata/types";

const errorMessage: string =
  "This function is a macro and should be transformed by ts-tiny-reflect at compile time.";

/// For test porpose.
export function hello(): "hello" {
  throw errorMessage;
}

/// Extract type metadata.
export function typeMetadata<T>(): NarrowedTypeMeta<T> {
  throw errorMessage;
}

/// Extract type metadata for object.
export function objectMetadata<T extends object>(): TypedObjectType<T> {
  throw errorMessage;
}
