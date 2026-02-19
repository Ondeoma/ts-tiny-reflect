import tiny_reflect, { ArrayType, FunctionType, IntersectionType, LiteralType, NeverType, ObjectType, PrimitiveType, TupleType, TypedObjectType, UnionType } from "@ondeoma/ts-tiny-reflect/macros";
const _never: NeverType = {
    "kind": "never"
};
const _number: PrimitiveType = {
    "kind": "primitive",
    "typeName": "number"
};
const _1: LiteralType = {
    "kind": "literal",
    "value": 1
};
const _true: LiteralType = {
    "kind": "literal",
    "value": true
};
const _tuble: TupleType = {
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
type SimpleObj = {
    num: number;
    str: string;
};
const _obj: ObjectType | IntersectionType = {
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
};
({
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
});
type ComplexObj = {
    tuple: [
        number,
        string
    ];
    arrObj?: SimpleObj[];
};
({
    "kind": "object",
    "name": "ComplexObj",
    "members": [
        {
            "name": "tuple",
            "type": {
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
            },
            "optional": false,
            "readonly": false
        },
        {
            "name": "arrObj",
            "type": {
                "kind": "array",
                "type": {
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
                }
            },
            "optional": true,
            "readonly": false
        }
    ]
});
const complexObjMeta: TypedObjectType<ComplexObj> = {
    "kind": "object",
    "name": "ComplexObj",
    "members": [
        {
            "name": "tuple",
            "type": {
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
            },
            "optional": false,
            "readonly": false
        },
        {
            "name": "arrObj",
            "type": {
                "kind": "array",
                "type": {
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
                }
            },
            "optional": true,
            "readonly": false
        }
    ]
};
const _memberNames = complexObjMeta.members.map(member => member?.name) satisfies (undefined | keyof ComplexObj)[];
type RecObj = {
    self: RecObj;
};
({
    "kind": "object",
    "name": "RecObj",
    "members": [
        {
            "name": "self",
            "type": {
                "kind": "reference",
                "name": "RecObj"
            },
            "optional": false,
            "readonly": false
        }
    ]
});
const _intersection: ObjectType | IntersectionType = {
    "kind": "intersection",
    "types": [
        {
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
        },
        {
            "kind": "object",
            "name": "ComplexObj",
            "members": [
                {
                    "name": "tuple",
                    "type": {
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
                    },
                    "optional": false,
                    "readonly": false
                },
                {
                    "name": "arrObj",
                    "type": {
                        "kind": "array",
                        "type": {
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
                        }
                    },
                    "optional": true,
                    "readonly": false
                }
            ]
        }
    ]
};
