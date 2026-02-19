//! These types shows what the macros should return.

import { TypeMeta } from "./macros/typeMetadata/types";
import { TypedObjectType } from "./macros/typeMetadata/userTypes";

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
export function objectMetadata<T extends object>(): TypedObjectType<T> {
  throw errorMessage;
}
