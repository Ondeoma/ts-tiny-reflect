import tiny_reflect, { ArrayType, FunctionType, IntersectionType, LiteralType, NeverType, ObjectType, PrimitiveType, TupleType, TypedObjectType, UnionType, } from "@ondeoma/ts-tiny-reflect/macros";
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
type SimpleObj = {
    num: number;
    str: string;
};
const _obj: TypedObjectType<SimpleObj> | IntersectionType = {
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
const _memberNames = complexObjMeta.members.map((member) => member?.name) satisfies (undefined | keyof ComplexObj)[];
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
function _genericFn<T, U>(arg: T): U {
    throw new Error();
}
const _genericFnMeta: FunctionType = {
    "kind": "function",
    "name": "_genericFn",
    "params": [
        {
            "name": "arg",
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
};
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
};
function _asyncFn(): Promise<number> {
    return Promise.resolve(1);
}
const _promiseMeta: FunctionType = {
    "kind": "function",
    "name": "_asyncFn",
    "params": [],
    "returns": {
        "kind": "object",
        "name": "Promise",
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
                                "kind": "union",
                                "types": [
                                    {
                                        "kind": "primitive",
                                        "typeName": "undefined"
                                    },
                                    {
                                        "kind": "literal",
                                        "value": null
                                    },
                                    {
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
                                                    "name": "TResult1"
                                                },
                                                {
                                                    "kind": "object",
                                                    "name": "PromiseLike",
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
                                                                            "kind": "union",
                                                                            "types": [
                                                                                {
                                                                                    "kind": "primitive",
                                                                                    "typeName": "undefined"
                                                                                },
                                                                                {
                                                                                    "kind": "literal",
                                                                                    "value": null
                                                                                },
                                                                                {
                                                                                    "kind": "function",
                                                                                    "name": "__type",
                                                                                    "params": [
                                                                                        {
                                                                                            "name": "value",
                                                                                            "type": {
                                                                                                "kind": "reference",
                                                                                                "name": "TResult1"
                                                                                            }
                                                                                        }
                                                                                    ],
                                                                                    "returns": {
                                                                                        "kind": "union",
                                                                                        "types": [
                                                                                            {
                                                                                                "kind": "reference",
                                                                                                "name": "TResult1"
                                                                                            },
                                                                                            {
                                                                                                "kind": "reference",
                                                                                                "name": "PromiseLike"
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    },
                                                                    {
                                                                        "name": "onrejected",
                                                                        "type": {
                                                                            "kind": "union",
                                                                            "types": [
                                                                                {
                                                                                    "kind": "primitive",
                                                                                    "typeName": "undefined"
                                                                                },
                                                                                {
                                                                                    "kind": "literal",
                                                                                    "value": null
                                                                                },
                                                                                {
                                                                                    "kind": "function",
                                                                                    "name": "__type",
                                                                                    "params": [
                                                                                        {
                                                                                            "name": "reason",
                                                                                            "type": {
                                                                                                "kind": "any"
                                                                                            }
                                                                                        }
                                                                                    ],
                                                                                    "returns": {
                                                                                        "kind": "union",
                                                                                        "types": [
                                                                                            {
                                                                                                "kind": "reference",
                                                                                                "name": "TResult2"
                                                                                            },
                                                                                            {
                                                                                                "kind": "reference",
                                                                                                "name": "PromiseLike"
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    }
                                                                ],
                                                                "returns": {
                                                                    "kind": "reference",
                                                                    "name": "PromiseLike"
                                                                }
                                                            },
                                                            "optional": false,
                                                            "readonly": false
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "name": "onrejected",
                            "type": {
                                "kind": "union",
                                "types": [
                                    {
                                        "kind": "primitive",
                                        "typeName": "undefined"
                                    },
                                    {
                                        "kind": "literal",
                                        "value": null
                                    },
                                    {
                                        "kind": "function",
                                        "name": "__type",
                                        "params": [
                                            {
                                                "name": "reason",
                                                "type": {
                                                    "kind": "any"
                                                }
                                            }
                                        ],
                                        "returns": {
                                            "kind": "union",
                                            "types": [
                                                {
                                                    "kind": "reference",
                                                    "name": "TResult2"
                                                },
                                                {
                                                    "kind": "object",
                                                    "name": "PromiseLike",
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
                                                                            "kind": "union",
                                                                            "types": [
                                                                                {
                                                                                    "kind": "primitive",
                                                                                    "typeName": "undefined"
                                                                                },
                                                                                {
                                                                                    "kind": "literal",
                                                                                    "value": null
                                                                                },
                                                                                {
                                                                                    "kind": "function",
                                                                                    "name": "__type",
                                                                                    "params": [
                                                                                        {
                                                                                            "name": "value",
                                                                                            "type": {
                                                                                                "kind": "reference",
                                                                                                "name": "TResult2"
                                                                                            }
                                                                                        }
                                                                                    ],
                                                                                    "returns": {
                                                                                        "kind": "union",
                                                                                        "types": [
                                                                                            {
                                                                                                "kind": "reference",
                                                                                                "name": "TResult1"
                                                                                            },
                                                                                            {
                                                                                                "kind": "reference",
                                                                                                "name": "PromiseLike"
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    },
                                                                    {
                                                                        "name": "onrejected",
                                                                        "type": {
                                                                            "kind": "union",
                                                                            "types": [
                                                                                {
                                                                                    "kind": "primitive",
                                                                                    "typeName": "undefined"
                                                                                },
                                                                                {
                                                                                    "kind": "literal",
                                                                                    "value": null
                                                                                },
                                                                                {
                                                                                    "kind": "function",
                                                                                    "name": "__type",
                                                                                    "params": [
                                                                                        {
                                                                                            "name": "reason",
                                                                                            "type": {
                                                                                                "kind": "any"
                                                                                            }
                                                                                        }
                                                                                    ],
                                                                                    "returns": {
                                                                                        "kind": "union",
                                                                                        "types": [
                                                                                            {
                                                                                                "kind": "reference",
                                                                                                "name": "TResult2"
                                                                                            },
                                                                                            {
                                                                                                "kind": "reference",
                                                                                                "name": "PromiseLike"
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    }
                                                                ],
                                                                "returns": {
                                                                    "kind": "reference",
                                                                    "name": "PromiseLike"
                                                                }
                                                            },
                                                            "optional": false,
                                                            "readonly": false
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ],
                    "returns": {
                        "kind": "reference",
                        "name": "Promise"
                    }
                },
                "optional": false,
                "readonly": false
            },
            {
                "name": "catch",
                "type": {
                    "kind": "function",
                    "name": "catch",
                    "params": [
                        {
                            "name": "onrejected",
                            "type": {
                                "kind": "union",
                                "types": [
                                    {
                                        "kind": "primitive",
                                        "typeName": "undefined"
                                    },
                                    {
                                        "kind": "literal",
                                        "value": null
                                    },
                                    {
                                        "kind": "function",
                                        "name": "__type",
                                        "params": [
                                            {
                                                "name": "reason",
                                                "type": {
                                                    "kind": "any"
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
                                                    "kind": "object",
                                                    "name": "PromiseLike",
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
                                                                            "kind": "union",
                                                                            "types": [
                                                                                {
                                                                                    "kind": "primitive",
                                                                                    "typeName": "undefined"
                                                                                },
                                                                                {
                                                                                    "kind": "literal",
                                                                                    "value": null
                                                                                },
                                                                                {
                                                                                    "kind": "function",
                                                                                    "name": "__type",
                                                                                    "params": [
                                                                                        {
                                                                                            "name": "value",
                                                                                            "type": {
                                                                                                "kind": "reference",
                                                                                                "name": "TResult"
                                                                                            }
                                                                                        }
                                                                                    ],
                                                                                    "returns": {
                                                                                        "kind": "union",
                                                                                        "types": [
                                                                                            {
                                                                                                "kind": "reference",
                                                                                                "name": "TResult1"
                                                                                            },
                                                                                            {
                                                                                                "kind": "reference",
                                                                                                "name": "PromiseLike"
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    },
                                                                    {
                                                                        "name": "onrejected",
                                                                        "type": {
                                                                            "kind": "union",
                                                                            "types": [
                                                                                {
                                                                                    "kind": "primitive",
                                                                                    "typeName": "undefined"
                                                                                },
                                                                                {
                                                                                    "kind": "literal",
                                                                                    "value": null
                                                                                },
                                                                                {
                                                                                    "kind": "function",
                                                                                    "name": "__type",
                                                                                    "params": [
                                                                                        {
                                                                                            "name": "reason",
                                                                                            "type": {
                                                                                                "kind": "any"
                                                                                            }
                                                                                        }
                                                                                    ],
                                                                                    "returns": {
                                                                                        "kind": "union",
                                                                                        "types": [
                                                                                            {
                                                                                                "kind": "reference",
                                                                                                "name": "TResult2"
                                                                                            },
                                                                                            {
                                                                                                "kind": "reference",
                                                                                                "name": "PromiseLike"
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    }
                                                                ],
                                                                "returns": {
                                                                    "kind": "reference",
                                                                    "name": "PromiseLike"
                                                                }
                                                            },
                                                            "optional": false,
                                                            "readonly": false
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ],
                    "returns": {
                        "kind": "reference",
                        "name": "Promise"
                    }
                },
                "optional": false,
                "readonly": false
            },
            {
                "name": "finally",
                "type": {
                    "kind": "function",
                    "name": "finally",
                    "params": [
                        {
                            "name": "onfinally",
                            "type": {
                                "kind": "union",
                                "types": [
                                    {
                                        "kind": "primitive",
                                        "typeName": "undefined"
                                    },
                                    {
                                        "kind": "literal",
                                        "value": null
                                    },
                                    {
                                        "kind": "function",
                                        "name": "__type",
                                        "params": [],
                                        "returns": {
                                            "kind": "void"
                                        }
                                    }
                                ]
                            }
                        }
                    ],
                    "returns": {
                        "kind": "reference",
                        "name": "Promise"
                    }
                },
                "optional": false,
                "readonly": false
            },
            {
                "name": "__@toStringTag@264",
                "type": {
                    "kind": "primitive",
                    "typeName": "string"
                },
                "optional": false,
                "readonly": true
            }
        ]
    }
};
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
