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
export function objectMetadata<T extends object>(): TypedObjectType<T> {
  throw errorMessage;
}
export type TypedObjectType<T = unknown> = {
  kind: "object";
  name?: string;
  members: {
    [K in keyof T]: ObjectMember<K>;
  }[keyof T][];
};
export type ObjectMember<K extends PropertyKey> = {
  name: K;
  type: TypeMeta;
  optional: boolean;
  readonly: boolean;
};
