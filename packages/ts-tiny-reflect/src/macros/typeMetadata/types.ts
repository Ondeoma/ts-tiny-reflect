type TypeKind =
  | "any"
  | "unknown"
  | "never"
  | "void"
  | "primitive"
  | "literal"
  | "array"
  | "tuple"
  | "function"
  | "object"
  | "union"
  | "intersection"
  | "reference";
interface ITypeMeta {
  readonly kind: TypeKind;
}
function _assertITypeMeta(value: TypeMeta): ITypeMeta {
  return value;
}

export type TypeMeta =
  | AnyType
  | UnknownType
  | NeverType
  | VoidType
  | PrimitiveType
  | LiteralType
  | ArrayType
  | TupleType
  | FunctionType
  | ObjectType
  | UnionType
  | IntersectionType
  | ReferenceType;

export type AnyType = { readonly kind: "any" };
export type UnknownType = { readonly kind: "unknown" };
export type NeverType = { readonly kind: "never" };
export type VoidType = { readonly kind: "void" };

export type PrimitiveType = {
  readonly kind: "primitive";
  readonly typeName: "string" | "number" | "boolean" | "undefined" | "symbol";
};

export type LiteralType = {
  readonly kind: "literal";
  readonly value: string | number | boolean | null;
};

export type ArrayType = {
  readonly kind: "array";
  readonly type: TypeMeta;
};

export type TupleType = {
  readonly kind: "tuple";
  readonly elements: TypeMeta[];
};

export type FunctionType = {
  readonly kind: "function";
  readonly name?: string;
  readonly params: readonly {
    readonly name: string;
    readonly type: TypeMeta;
  }[];
  readonly returns: TypeMeta;
};

export type ObjectType = {
  readonly kind: "object";
  readonly name?: string;
  readonly members: readonly {
    readonly name: string;
    readonly type: TypeMeta;
    readonly optional: boolean;
    readonly readonly: boolean;
  }[];
};

export type UnionType = {
  readonly kind: "union";
  readonly types: TypeMeta[];
};

export type IntersectionType = {
  readonly kind: "intersection";
  readonly types: TypeMeta[];
};

export type ReferenceType = {
  readonly kind: "reference";
  readonly name?: string;
};
