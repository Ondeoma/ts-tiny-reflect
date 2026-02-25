import tiny_reflect, { ArrayType, FunctionType, IntersectionType, LiteralType, NeverType, ObjectType, PrimitiveType, TupleType, TypedObjectType, UnionType, } from "@ondeoma/ts-tiny-reflect/macros";
const _never: NeverType = {
    "kind": "never"
};
const _number: PrimitiveType = {
    "kind": "primitive",
    "typeName": "number"
};
const _symbol: PrimitiveType = {
    "kind": "primitive",
    "typeName": "symbol"
};
const _1: LiteralType = {
    "kind": "literal",
    "value": 1
};
const _true: LiteralType = {
    "kind": "literal",
    "value": true
};
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
};
const _arr: ArrayType = {
    "kind": "array",
    "type": {
        "kind": "primitive",
        "typeName": "string"
    }
};
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
};
function _voidFn() { }
const _fn: FunctionType = {
    "kind": "function",
    "name": "_voidFn",
    "params": [],
    "returns": {
        "kind": "void"
    }
};
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
};
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
};
