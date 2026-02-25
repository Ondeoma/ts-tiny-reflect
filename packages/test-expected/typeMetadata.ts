import tiny_reflect, { ArrayType, FunctionType, IntersectionType, LiteralType, NeverType, ObjectType, PrimitiveType, TupleType, TypedObjectType, UnionType, } from "@ondeoma/ts-tiny-reflect/macros";
const _never: NeverType = {
    "kind": "never"
} as const;
const _number: PrimitiveType = {
    "kind": "primitive",
    "typeName": "number"
} as const;
const _symbol: PrimitiveType = {
    "kind": "primitive",
    "typeName": "symbol"
} as const;
const _1: LiteralType = {
    "kind": "literal",
    "value": 1
} as const;
const _true: LiteralType = {
    "kind": "literal",
    "value": true
} as const;
const _tuple: TupleType = {
    "kind": "tuple",
    "elements": [
        {
            "kind": "primitive",
            "typeName": "number"
        },
        {
            "kind": "primitive",
            "typeName": "string"
        }
    ]
} as const;
const _arr: ArrayType = {
    "kind": "array",
    "type": {
        "kind": "primitive",
        "typeName": "string"
    }
} as const;
const _union: UnionType = {
    "kind": "union",
    "types": [
        {
            "kind": "primitive",
            "typeName": "string"
        },
        {
            "kind": "primitive",
            "typeName": "number"
        }
    ]
} as const;
function _voidFn() { }
const _fn: FunctionType = {
    "kind": "function",
    "name": "_voidFn",
    "params": [],
    "returns": {
        "kind": "void"
    }
} as const;
type Obj1 = {
    num: number;
};
const _obj: TypedObjectType<Obj1> | IntersectionType = {
    "kind": "object",
    "name": "Obj1",
    "members": [
        {
            "name": "num",
            "type": {
                "kind": "primitive",
                "typeName": "number"
            },
            "optional": false,
            "readonly": false
        }
    ]
} as const;
type Obj2 = {
    str: string;
};
const _intersection: ObjectType | IntersectionType = {
    "kind": "intersection",
    "types": [
        {
            "kind": "object",
            "name": "Obj1",
            "members": [
                {
                    "name": "num",
                    "type": {
                        "kind": "primitive",
                        "typeName": "number"
                    },
                    "optional": false,
                    "readonly": false
                }
            ]
        },
        {
            "kind": "object",
            "name": "Obj2",
            "members": [
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
        }
    ]
} as const;
