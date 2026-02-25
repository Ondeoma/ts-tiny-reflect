import tiny_reflect, { FunctionType, IntersectionType, ObjectType, } from "@ondeoma/ts-tiny-reflect/macros";
type SimpleObj = {
    num: number;
    str: string;
};
type ComplexObj = {
    tuple: [
        number,
        string
    ];
    arrObj?: SimpleObj[];
};
const _cobj = {
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
} as const;
type RecObj = {
    self: RecObj;
};
const _robj = {
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
} as const;
function _genericFn<T, U>(_arg: T): U {
    throw new Error();
}
const _genericFnMeta: FunctionType = {
    "kind": "function",
    "name": "_genericFn",
    "params": [
        {
            "name": "_arg",
            "type": {
                "kind": "reference",
                "name": "T"
            }
        }
    ],
    "returns": {
        "kind": "reference",
        "name": "U"
    }
} as const;
interface GenericMethodObject {
    map<T, U>(array: T[], callback: (item: T) => U): U[];
}
const _genericMethodMeta: ObjectType | IntersectionType = {
    "kind": "object",
    "name": "GenericMethodObject",
    "members": [
        {
            "name": "map",
            "type": {
                "kind": "function",
                "name": "map",
                "params": [
                    {
                        "name": "array",
                        "type": {
                            "kind": "array",
                            "type": {
                                "kind": "reference",
                                "name": "T"
                            }
                        }
                    },
                    {
                        "name": "callback",
                        "type": {
                            "kind": "function",
                            "name": "__type",
                            "params": [
                                {
                                    "name": "item",
                                    "type": {
                                        "kind": "reference",
                                        "name": "T"
                                    }
                                }
                            ],
                            "returns": {
                                "kind": "reference",
                                "name": "U"
                            }
                        }
                    }
                ],
                "returns": {
                    "kind": "array",
                    "type": {
                        "kind": "reference",
                        "name": "U"
                    }
                }
            },
            "optional": false,
            "readonly": false
        }
    ]
} as const;
type MyPromiseLike<T> = {
    then<TResult>(onfulfilled: (value: T) => TResult | MyPromiseLike<TResult>): MyPromiseLike<TResult>;
};
const _myPromiseLikeMeta: ObjectType | IntersectionType = {
    "kind": "object",
    "name": "MyPromiseLike",
    "members": [
        {
            "name": "then",
            "type": {
                "kind": "function",
                "name": "then",
                "params": [
                    {
                        "name": "onfulfilled",
                        "type": {
                            "kind": "function",
                            "name": "__type",
                            "params": [
                                {
                                    "name": "value",
                                    "type": {
                                        "kind": "primitive",
                                        "typeName": "number"
                                    }
                                }
                            ],
                            "returns": {
                                "kind": "union",
                                "types": [
                                    {
                                        "kind": "reference",
                                        "name": "TResult"
                                    },
                                    {
                                        "kind": "reference",
                                        "name": "MyPromiseLike"
                                    }
                                ]
                            }
                        }
                    }
                ],
                "returns": {
                    "kind": "reference",
                    "name": "MyPromiseLike"
                }
            },
            "optional": false,
            "readonly": false
        }
    ]
} as const;
