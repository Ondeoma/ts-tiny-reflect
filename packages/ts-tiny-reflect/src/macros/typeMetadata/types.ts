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
  kind: TypeKind;
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

export type AnyType = { kind: "any" };
export type UnknownType = { kind: "unknown" };
export type NeverType = { kind: "never" };
export type VoidType = { kind: "void" };

export type PrimitiveType = {
  kind: "primitive";
  typeName: "string" | "number" | "boolean" | "undefined" | "symbol";
};

export type LiteralType = {
  kind: "literal";
  value: string | number | boolean | null;
};

export type ArrayType = {
  kind: "array";
  type: TypeMeta;
};

export type TupleType = {
  kind: "tuple";
  elements: TypeMeta[];
};

export type FunctionType = {
  kind: "function";
  name?: string;
  params: {
    name: string;
    type: TypeMeta;
  }[];
  returns: TypeMeta;
};

export type ObjectType = {
  kind: "object";
  name?: string;
  members: {
    name: string;
    type: TypeMeta;
    optional: boolean;
    readonly: boolean;
  }[];
};

export type UnionType = {
  kind: "union";
  types: TypeMeta[];
};

export type IntersectionType = {
  kind: "intersection";
  types: TypeMeta[];
};

export type ReferenceType = {
  kind: "reference";
  name?: string;
};
