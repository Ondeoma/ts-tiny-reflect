import tiny_reflect, {
  ArrayType,
  FunctionType,
  IntersectionType,
  LiteralType,
  NeverType,
  ObjectType,
  PrimitiveType,
  TupleType,
  TypedObjectType,
  UnionType,
} from "@ondeoma/ts-tiny-reflect/macros";

const _never: NeverType = tiny_reflect.typeMetadata<never>();

const _number: PrimitiveType = tiny_reflect.typeMetadata<number>();

const _symbol: PrimitiveType = tiny_reflect.typeMetadata<symbol>();

const _1: LiteralType = tiny_reflect.typeMetadata<1>();

const _true: LiteralType = tiny_reflect.typeMetadata<true>();

const _tuple: TupleType = tiny_reflect.typeMetadata<[number, string]>();

const _arr: ArrayType = tiny_reflect.typeMetadata<string[]>();

const _union: UnionType = tiny_reflect.typeMetadata<string | number>();

function _voidFn() {}
const _fn: FunctionType = tiny_reflect.typeMetadata<typeof _voidFn>();

type Obj1 = {
  num: number;
};
const _obj: TypedObjectType<Obj1> | IntersectionType =
  tiny_reflect.typeMetadata<Obj1>();

type Obj2 = {
  str: string;
};
const _intersection: ObjectType | IntersectionType = tiny_reflect.typeMetadata<
  Obj1 & Obj2
>();
