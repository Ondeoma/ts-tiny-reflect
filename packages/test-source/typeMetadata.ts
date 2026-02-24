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

const _1: LiteralType = tiny_reflect.typeMetadata<1>();

const _true: LiteralType = tiny_reflect.typeMetadata<true>();

const _tuple: TupleType = tiny_reflect.typeMetadata<[number, string]>();

const _arr: ArrayType = tiny_reflect.typeMetadata<string[]>();

const _union: UnionType = tiny_reflect.typeMetadata<string | number>();

function _voidFn() {}
const _fn: FunctionType = tiny_reflect.typeMetadata<typeof _voidFn>();

type SimpleObj = {
  num: number;
  str: string;
};
const _obj: TypedObjectType<SimpleObj> | IntersectionType =
  tiny_reflect.typeMetadata<SimpleObj>();
tiny_reflect.objectMetadata<SimpleObj>();

type ComplexObj = {
  tuple: [number, string];
  arrObj?: SimpleObj[];
};
tiny_reflect.typeMetadata<ComplexObj>();
const complexObjMeta: TypedObjectType<ComplexObj> =
  tiny_reflect.objectMetadata<ComplexObj>();
const _memberNames = complexObjMeta.members.map(
  (member) => member?.name,
) satisfies (undefined | keyof ComplexObj)[];

type RecObj = {
  self: RecObj;
};
tiny_reflect.typeMetadata<RecObj>();

function _genericFn<T, U>(arg: T): U {
  throw new Error();
}
const _genericFnMeta: FunctionType = tiny_reflect.typeMetadata<typeof _genericFn>();

interface GenericMethodObject {
  map<T, U>(array: T[], callback: (item: T) => U): U[];
}
const _genericMethodMeta: ObjectType | IntersectionType = tiny_reflect.typeMetadata<GenericMethodObject>();

function _asyncFn(): Promise<number> {
  return Promise.resolve(1);
}
const _promiseMeta: FunctionType = tiny_reflect.typeMetadata<typeof _asyncFn>();

const _intersection: ObjectType | IntersectionType = tiny_reflect.typeMetadata<
  SimpleObj & ComplexObj
>();
