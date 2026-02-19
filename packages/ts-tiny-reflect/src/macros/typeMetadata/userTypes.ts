/* eslint-disable @typescript-eslint/no-explicit-any */

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

type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

type IsAny<T> = 0 extends 1 & T ? true : false;
type IsNever<T> = [T] extends [never] ? true : false;
type IsUnknown<T> = unknown extends T
  ? IsAny<T> extends false
    ? true
    : false
  : false;
type IsTuple<T> = T extends readonly any[]
  ? number extends T["length"]
    ? false
    : true
  : false;

export type NarrowedTypeMeta<T> =
  // SpecialTypes
  IsAny<T> extends true
    ? AnyType
    : IsUnknown<T> extends true
      ? UnknownType
      : IsNever<T> extends true
        ? NeverType
        : [T] extends [void]
          ? VoidType
          : // Union
            IsUnion<T> extends true
            ? UnionType
            : // Primitive, Literal
              T extends string
              ? string extends T
                ? PrimitiveType
                : LiteralType
              : T extends number
                ? number extends T
                  ? PrimitiveType
                  : LiteralType
                : T extends boolean
                  ? boolean extends T
                    ? PrimitiveType
                    : LiteralType
                  : T extends undefined
                    ? PrimitiveType
                    : T extends null
                      ? LiteralType
                      : // Tuple (specialized array)
                        IsTuple<T> extends true
                        ? TupleType
                        : // Array
                          T extends Array<any>
                          ? ArrayType
                          : // Function
                            T extends (...args: any[]) => any
                            ? FunctionType
                            : // Object (including Intersection)
                              T extends object
                              ? ObjectType | IntersectionType
                              : // Fallback
                                TypeMeta;
