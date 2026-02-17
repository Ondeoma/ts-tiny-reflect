//! These types shows what the macros should return.

import { ObjectType, TypeMeta } from "./macros/typeMetadata";

const errorMessage: string =
  "This function is a macro and should be transformed by ts-tiny-reflect at compile time.";

/// For test porpose.
export function hello(): "hello" {
  throw errorMessage;
}

/// Extract type metadata.
export function typeMetadata<_T>(): TypeMeta {
  throw errorMessage;
}

/// Extract type metadata for object.
export function objectMetadata<_T extends object>(): ObjectType {
  throw errorMessage;
}
