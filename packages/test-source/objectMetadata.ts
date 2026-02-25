import tiny_reflect, { TypedObjectType } from "@ondeoma/ts-tiny-reflect/macros";

type SimpleObj = {
  num: number;
  str: string;
};
const objMeta: TypedObjectType<SimpleObj> =
  tiny_reflect.objectMetadata<SimpleObj>();
const _memberNames = objMeta.members.map(
  (member) => member.name,
) satisfies (keyof SimpleObj)[];
