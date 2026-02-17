import tiny_reflect from "@ondeoma/ts-tiny-reflect/macros"

tiny_reflect.typeMetadata<never>();

tiny_reflect.typeMetadata<number>();

tiny_reflect.typeMetadata<1>();

tiny_reflect.typeMetadata<[number, string]>();

tiny_reflect.typeMetadata<string[]>();

function voidFn() {}
tiny_reflect.typeMetadata<typeof voidFn>();

type SimpleObj = {
  num: number;
  str: string;
}
tiny_reflect.typeMetadata<SimpleObj>();

type ComplexObj = {
  tuple: [number, string];
  arrObj?: SimpleObj[];
}
tiny_reflect.typeMetadata<ComplexObj>();

type RecObj = {
  self: RecObj;
}
tiny_reflect.typeMetadata<RecObj>();
