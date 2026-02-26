import { describe, it, expect } from 'vitest';

import ts from "typescript";
import { createArrayParser, createTupleParser, createUnionParser, ParsableValue, parseBoolean, parseNumber, Parser, parseString } from "../src/utils/expressionToValue";
import { createProgramFromCode } from './utils';


function getLastExpression(
  program: ts.Program,
  fileName: string = "test.ts"
): ts.Expression {
  const sourceFile = program.getSourceFile(fileName);
  if (!sourceFile) throw new Error(`File not found: ${fileName}`);
  const lastStatement = sourceFile.statements[sourceFile.statements.length - 1];
  if (!lastStatement || !ts.isExpressionStatement(lastStatement)) {
    throw new Error("The last statement is not an expression.");
  }
  return lastStatement.expression;
}

function expectParseMatch<T extends ParsableValue>(code: string, expected: T, parser: Parser<T>) {
  const program = createProgramFromCode(code);
  const expr = getLastExpression(program);
  expect(parser(expr, program.getTypeChecker())).toEqual(expected);
}


describe('Parse expression to value', () => {
  describe('resolveConstInitializer', () => {
    it('should handle const identifier', () => {
      expectParseMatch("const target = 42; target", 42, parseNumber);
    });
    it('should handle chained const identifier', () => {
      expectParseMatch("const target = 42; const medium = target; medium", 42, parseNumber);
    });
  });
  describe('parseNumber', () => {
    it('should handle number literal', () => {
      expectParseMatch("42", 42, parseNumber);
    });
    it('should handle negative number literal', () => {
      expectParseMatch("-42", -42, parseNumber);
    });
  });
  describe('parseString', () => {
    it('should handle string literal', () => {
      expectParseMatch("'test'", 'test', parseString);
    });
  });
  describe('parseBoolean', () => {
    it('should handle true literal', () => {
      expectParseMatch("true", true, parseBoolean);
    });
    it('should handle false literal', () => {
      expectParseMatch("false", false, parseBoolean);
    });
  });
  describe('parseArray', () => {
    it('should handle array of number', () => {
      expectParseMatch("[0, 1, 2]", [0, 1, 2], createArrayParser(parseNumber));
    });
    it('should handle nested array', () => {
      expectParseMatch("[[0, 1, 2], [3, 4, 5]]", [[0, 1, 2], [3, 4, 5]], createArrayParser(createArrayParser(parseNumber)));
    });
  });
  describe('parseTuple', () => {
    it('should handle tuple [number, string]', () => {
      expectParseMatch("[42, 'test']", [42, 'test'], createTupleParser([parseNumber, parseString]));
    });
    it('should handle nested tuple', () => {
      expectParseMatch("[[42, 'test'], 3]", [[42, 'test'], 3], createTupleParser([createTupleParser([parseNumber, parseString]), parseNumber]));
    });
  });
  describe('parseArray', () => {
    it('should handle number for (number | string)', () => {
      expectParseMatch("42", 42, createUnionParser([parseNumber, parseString]));
    });
    it('should handle string for (number | string)', () => {
      expectParseMatch("'test'", 'test', createUnionParser([parseNumber, parseString]));
    });
  });
});
