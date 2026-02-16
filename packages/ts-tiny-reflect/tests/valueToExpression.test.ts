import { describe, it, expect, beforeAll, assert } from 'vitest';

import ts from "typescript";
import {valueToExpression, SerializableValue} from "../src/utils"

describe('Integration Test: packages/test-source', () => {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const dummySourceFile = ts.createSourceFile('test.ts', '', ts.ScriptTarget.Latest);

  function assertValueToExpression(originalValue: SerializableValue) {
    const node = valueToExpression(originalValue);
    const code = printer.printNode(ts.EmitHint.Expression, node, dummySourceFile);
    const restoredValue = new Function(`return ${code}`)();
    expect(restoredValue).toEqual(originalValue);
    expect(code).toMatchSnapshot();
  }

  it('should handle primitive types', () => {
    assertValueToExpression(123);
    assertValueToExpression("hello");
    assertValueToExpression(true);
    assertValueToExpression(false);
    assertValueToExpression(null);
    assertValueToExpression(undefined);
  });

  it('should handle arrays', () => {
    assertValueToExpression([1, 2, 3]);
    assertValueToExpression(["a", "b", null]);
    assertValueToExpression([]);
  });

  it('should handle complex objects', () => {
    assertValueToExpression({
      id: 1,
      name: "User",
      tags: ["admin", "editor"],
      metadata: {
        isValid: true,
        count: 0
      }
    });
  });

  it('should handle undefined inside objects', () => {
    assertValueToExpression({
      required: true,
      optional: undefined 
    });
  });
});