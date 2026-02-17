# ts-tiny-reflect
This is a Source Transformer that allows you to get type metadata in TypeScript.
It is designed for use with [ts-patch](https://github.com/nonara/ts-patch).

## Usage

### 1. Configuration

Add it to your `tsconfig.json`:
```json
{
  "compilerOptions": {
    "plugins": [
      {"transform": "@ondeoma/ts-tiny-reflect"}
    ]
  }
}
```

### 2. Writing code
**In your code:**
```typescript
import tiny_reflect from "@ondeoma/ts-tiny-reflect/macros";
tiny_reflect.typeMetadata<[number, string]>();
```

**Transformed result:**
```typescript
import tiny_reflect from "@ondeoma/ts-tiny-reflect/macros";
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
```

See `packages/tis-tiny-reflect/macros` for full list of macros.
