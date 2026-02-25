import tiny_reflect, {
  FunctionType,
  IntersectionType,
  ObjectType,
} from "@ondeoma/ts-tiny-reflect/macros";

type SimpleObj = {
  num: number;
  str: string;
};
type ComplexObj = {
  tuple: [number, string];
  arrObj?: SimpleObj[];
};
const _cobj = tiny_reflect.typeMetadata<ComplexObj>();

type RecObj = {
  self: RecObj;
};
const _robj = tiny_reflect.typeMetadata<RecObj>();

function _genericFn<T, U>(_arg: T): U {
  throw new Error();
}
const _genericFnMeta: FunctionType =
  tiny_reflect.typeMetadata<typeof _genericFn>();

interface GenericMethodObject {
  map<T, U>(array: T[], callback: (item: T) => U): U[];
}
const _genericMethodMeta: ObjectType | IntersectionType =
  tiny_reflect.typeMetadata<GenericMethodObject>();

type MyPromiseLike<T> = {
  then<TResult>(
    onfulfilled: (value: T) => TResult | MyPromiseLike<TResult>,
  ): MyPromiseLike<TResult>;
};
const _myPromiseLikeMeta: ObjectType | IntersectionType =
  tiny_reflect.typeMetadata<MyPromiseLike<number>>();
