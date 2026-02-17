import { describe, it, expect, beforeAll, assert } from 'vitest';

import ts from "typescript";
import fs from "node:fs";
import path from "node:path";
import { execSync } from 'node:child_process';
import { getSources, matchSourceAST } from './utils';

const PROJECT_ROOT = process.env.PROJECT_ROOT!;
const SRC_DIR = path.resolve(PROJECT_ROOT, 'packages/test-source');
const TRANSFORMED_DIR = path.resolve(SRC_DIR, 'transformed');
const EXPECT_DIR = path.resolve(PROJECT_ROOT, 'packages/test-expected');

describe('Integration Test: packages/test-source', () => {
  // clean up
  beforeAll(() => {
    if (fs.existsSync(TRANSFORMED_DIR)) {
      fs.rmSync(TRANSFORMED_DIR, { recursive: true, force: true });
    }
  });

  it('should printed successfully', () => {
    expect(() => {
      execSync('npm run build:test-source', { 
        cwd: PROJECT_ROOT, 
        stdio: 'inherit',
      });
    }).not.toThrow();
    expect(fs.existsSync(TRANSFORMED_DIR)).toBe(true);
  });

  describe('Test: Each macro', () => {
    const transformedSources = getSources(SRC_DIR, TRANSFORMED_DIR);
    const expectedSources = getSources(SRC_DIR, EXPECT_DIR);
    const printer = ts.createPrinter({
      newLine: ts.NewLineKind.LineFeed,
    });
    function matchIt(name: string) {
      it (name, () => {
        const basename = `${name}.ts`;
        const transformed = transformedSources.get(basename);
        const expected = expectedSources.get(basename);
        matchSourceAST(transformed, expected, printer);
      })
    }
    matchIt("hello");
    matchIt("typeMetadata");
  })

});

