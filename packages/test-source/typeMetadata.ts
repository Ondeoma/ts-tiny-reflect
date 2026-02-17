import tiny_reflect from "@ondeoma/ts-tiny-reflect/macros"

tiny_reflect.typeMetadata<never>();

tiny_reflect.typeMetadata<number>();

tiny_reflect.typeMetadata<1>();

tiny_reflect.typeMetadata<true>();

tiny_reflect.typeMetadata<[number, string]>();

tiny_reflect.typeMetadata<string[]>();

function _voidFn() {}
tiny_reflect.typeMetadata<typeof _voidFn>();

type SimpleObj = {
  num: number;
  str: string;
}
tiny_reflect.typeMetadata<SimpleObj>();
tiny_reflect.objectMetadata<SimpleObj>();

type ComplexObj = {
  tuple: [number, string];
  arrObj?: SimpleObj[];
}
tiny_reflect.typeMetadata<ComplexObj>();
tiny_reflect.objectMetadata<ComplexObj>();

type RecObj = {
  self: RecObj;
}
tiny_reflect.typeMetadata<RecObj>();
