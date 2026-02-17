import tiny_reflect from "@ondeoma/ts-tiny-reflect/macros";

({
    "kind": "never"
});

({
    "kind": "primitive",
    "typeName": "number"
});

({
    "kind": "literal",
    "value": 1
});

({
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
});

({
    "kind": "array",
    "type": {
        "kind": "primitive",
        "typeName": "string"
    }
});

function _voidFn() { }
({
    "kind": "function",
    "name": "_voidFn",
    "params": [],
    "returns": {
        "kind": "void"
    }
});

type SimpleObj = {
    num: number;
    str: string;
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
