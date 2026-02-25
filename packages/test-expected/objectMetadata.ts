import tiny_reflect, { TypedObjectType } from "@ondeoma/ts-tiny-reflect/macros";
type SimpleObj = {
    num: number;
    str: string;
};
const objMeta: TypedObjectType<SimpleObj> = {
    "kind": "object",
    "name": "SimpleObj",
    "members": [
        {
            "name": "num",
            "type": {
                "kind": "primitive",
                "typeName": "number"
            },
            "optional": false,
            "readonly": false
        },
        {
            "name": "str",
            "type": {
                "kind": "primitive",
                "typeName": "string"
            },
            "optional": false,
            "readonly": false
        }
    ]
} as const;
const _memberNames = objMeta.members.map((member) => member.name) satisfies (keyof SimpleObj)[];
